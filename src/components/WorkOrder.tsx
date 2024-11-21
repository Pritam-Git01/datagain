"use client";

import { EllipsisVertical, Pencil, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { GridApi, ColDef } from "ag-grid-community";
import MyFormDialog from "./Form";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, fillEditOrderData } from "@/features/orders/OrderSlice";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
// import { selectAllOrders } from "@/features/orders/OrderSlice";
export interface Order {
  id: string;
  amount: number;
  barcode: string;
  date: string;
  donor_name: string;
  observer_name: string;
  panels_name: string;
  source_name: string;
  status_name: string;
}

export default function WorkOrder() {
  const gridRef = useRef<AgGridReactType<GridApi> | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>("Create Order");
  // const [isMounted, setIsMounted] = useState<boolean>(false);
  const allOrdersData =
    useSelector((data: any) => data.orders.ordersData) || [];
  const selectedEditOrder =
    useSelector((data: any) => data.orders.selectedOrder) || null;
  const [rowData, setRowData] = useState<Order[] | []>([]);

  //  const updateOrdersData = useCallback(() => {
  //   const ordersData = [...allOrdersData];
  //     setRowData(ordersData);
  //  }, [allOrdersData])

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(selectedEditOrder);
    if (selectedEditOrder !== null) {
      setFormTitle("Edit Order");
      handleDialogOpen();
    }
  }, [selectedEditOrder]);

  useEffect(() => {
    setRowData(allOrdersData);
  }, [allOrdersData]);

  interface dateParams {
    value: string
  }
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { headerName: "DONOR", field: "donor_name", flex: 1},
    { headerName: "PANELS", field: "panels_name", flex: 1 },
    { headerName: "BARCODE", field: "barcode", flex: 1 },
    { headerName: "SOURCE", field: "source_name", flex: 1 },
    {
      headerName: "DATE",
      field: "date",
      flex: 1,
      valueFormatter: (params: dateParams) => {
        // Ensure the date is valid before formatting
        if (!params.value) return "";
        return format(new Date(params.value), "dd/MM/yyyy");
      },
    },
    { headerName: "AMOUNT($)", field: "amount", flex: 1 },
    { headerName: "OBSERVED BY", field: "observer_name", flex: 1 },
    { headerName: "STATUS", field: "status_name", flex: 1 },
    {
      headerName: "ACTION",
      field: "",
      cellRenderer: ActionCellRenderer,
      flex: 1,
    },
  ]);

  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])

  // if(!isMounted) return null;



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;

    gridRef.current?.api.setFilterModel({
      donor_name: {
        type: "text",
        filter: filterValue,
        filterType: "text",
        filterOption: "contains",
      },
    });
  };

  console.log(allOrdersData);
  return (
    <>
      <div className="px-12 py-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2 flex gap-8 items-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Work Orders
            </h1>
            <Button
              onClick={handleDialogOpen}
              className="bg-emerald-500 hover:bg-emerald-600">
              Create Order
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            onChange={handleSearch}
              className="pl-8"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="ag-theme-quartz h-[400px] px-12 py-4 relative">
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} />
      </div>
      <MyFormDialog
        open={isOpen}
        title={formTitle}
        editOrderData={selectedEditOrder}
        onDialogClose={handleDialogClose}
      />
    </>
  );
}

interface CellPropsDatatInetrface {
  data: Order;
}
export const ActionCellRenderer: React.FC<CellPropsDatatInetrface> = (
  props
) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const handleEdit = () => {
    console.log("Edit clicked for row:", props.data); // Access row data
    dispatch(fillEditOrderData(props.data.id));
  };

  const handleDelete = () => {
    console.log("Delete clicked for row:", props.data); // Access row data
    dispatch(deleteOrder(props.data.id));
  };

  return (
    <div className="flex items-center justify-center pt-1 gap-2">
      <button
        onClick={handleEdit}
        className="rounded-full h-8 w-8 flex justify-center items-center bg-blue-400 text-white"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={handleDelete}
        className="rounded-full h-8 w-8 flex justify-center items-center bg-red-400 text-white"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
