"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CrossIcon, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, UseDispatch } from "react-redux";
import { addOrder, updateOrder } from "@/features/orders/OrderSlice";

import { Order } from "./WorkOrder";

const formSchema = z.object({
  donor_name: z.string().min(3).max(30),
  panels_name: z.string().min(3).max(30),
  barcode: z.string().min(10).max(10),
  source_name: z.string().min(3).max(20),
  date: z.date(),
  amount: z.number().optional() || 0,
  observer_name: z.string().min(3),
  status_name: z.string().min(3),
});

interface FormDialogProps {
  open: boolean;
  title: string;
  editOrderData?: Order | null;
  onDialogClose: () => void;
}

const MyFormDialog: React.FC<FormDialogProps> = ({
  open,
  title,
  editOrderData,
  onDialogClose,
}) => {
  const [isEditableMode, setisEditableMode] = useState<boolean>(false);
  const [currentEditOrderId, setCurrentEditOrderId] = useState<string>("");
  const { toast } = useToast();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { handleSubmit, reset } = form;



  useEffect(() => {
    if (editOrderData) {
    setisEditableMode(true);
    setCurrentEditOrderId(editOrderData.id);
      reset({
        donor_name: editOrderData.donor_name,
        panels_name: editOrderData.panels_name,
        barcode: editOrderData.barcode,
        source_name: editOrderData.source_name,
        date: editOrderData.date ? new Date(editOrderData.date) : new Date(),
        amount: editOrderData.amount || 0,
        observer_name: editOrderData.observer_name,
        status_name: editOrderData.status_name,
      });
    }
  }, [editOrderData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      if (!isEditableMode) {
        dispatch(
          addOrder(
            values.amount,
            values.barcode,
            values.date,
            values.donor_name,
            values.observer_name,
            values.panels_name,
            values.source_name,
            values.status_name
          )
        );

        toast({
          title: "Order Created",
          description: "Congrats!! 🎉, Your order has been created",
        });
      } else {
        dispatch(
          updateOrder({
            id: currentEditOrderId,
            amount: values.amount,
            barcode: values.barcode,
            date: values.date.toISOString(),
            donor_name: values.donor_name,
            observer_name: values.observer_name,
            panels_name: values.panels_name,
            source_name: values.source_name,
            status_name: values.status_name,
          })
        );

        toast({
          title: "Order Update",
          description: "Congrats!! 🎉, Your order has been updated",
        });
      }
      handleDialogClose();
    } catch (error) {
      console.error("Form submission error", error);
      alert("Failed to submit the form. Please try again.");
    }
  }

  const handleDialogClose = () => {
    reset(); // Reset form fields
    onDialogClose(); // Close the modal
  };
  // if (!isMounted) return null;
  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={handleDialogClose}
      classNames={{ modal: "customModal" }}
      open={open}
      showCloseIcon={false}
      center
    >
      <section className="flex flex-col justify-center px-2">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-2xl font-semibold leading-tight">
            {title || "Create Order"}
          </h2>
          <button onClick={handleDialogClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Donor
              </label>
              <input
                {...form.register("donor_name")}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter donor name"
              />
              {form.formState.errors.donor_name && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.donor_name.message}
                </p>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Panels
              </label>
              <input
                {...form.register("panels_name")}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter panels name"
              />
              {form.formState.errors.panels_name && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.panels_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Barcode
              </label>
              <input
                {...form.register("barcode")}
                type="text"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Eg: 1234551000"
              />
              {form.formState.errors.barcode && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.barcode.message}
                </p>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <input
                {...form.register("source_name")}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Eg: Self Pay"
              />
              {form.formState.errors.source_name && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.source_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="relative">
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      // onChange={(date: Date) => field.onChange(date)}
                      customInput={
                        <div className="relative">
                          <input
                            type="text"
                            value={
                              field.value ? format(field.value, "PPP") : ""
                            }
                            readOnly
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      }
                    />
                  )}
                />
              </div>
              {form.formState.errors.date && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                {...form.register("amount", { valueAsNumber: true })}
                type="number"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter amount"
              />
              {form.formState.errors.amount && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Observer Name
              </label>
              <select
                {...form.register("observer_name")}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option className="text-gray-400" value="">
                  Select Observer name
                </option>
                <option value="Chavan Vishal">Chavan Vishal</option>
                <option value="Mushalkar Rohit">Mushalkar Rohit</option>
              </select>
              {form.formState.errors.observer_name && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.observer_name.message}
                </p>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...form.register("status_name")}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option className="text-gray-400" value="">
                  Select status
                </option>
                <option value="Unable to Donate">Unable to Donate</option>
                <option value="Refused">Refused</option>
                <option value="Duplicate/Error">Duplicate/Error</option>
                <option value="Insuffiecient Donation">
                  Insuffiecient Donation
                </option>
                <option value="Approved">Approved</option>
              </select>
              {form.formState.errors.status_name && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.status_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-fit px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default MyFormDialog;
