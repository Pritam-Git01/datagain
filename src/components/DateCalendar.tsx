'use client'

import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarIcon } from 'lucide-react'

type Event = {
  date: Date
  type: 'event' | 'reminder'
  title: string
}

export default function DateCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const addItem = (type: 'event' | 'reminder') => {
    if (selectedDate) {
      const title = prompt(`Enter ${type} title:`)
      if (title) {
        setEvents([...events, { date: selectedDate, type, title }])
      }
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date))
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div>
          <Button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
            Previous
          </Button>
          <Button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="ml-2">
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {monthDays.map(day => {
          const dayEvents = getEventsForDate(day)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-16 ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : ''} 
                              ${isSelected ? 'bg-blue-100 border-blue-500' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <span>{format(day, 'd')}</span>
                    <div className="flex justify-center space-x-1">
                      {dayEvents.some(e => e.type === 'event') && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      )}
                      {dayEvents.some(e => e.type === 'reminder') && (
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => addItem('event')}>Add Event</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addItem('reminder')}>Add Reminder</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {dayEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${event.type === 'event' ? 'bg-blue-100' : 'bg-red-100'}`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )
        })}
      </div>
      {selectedDate && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Selected Date: {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).map((event, index) => (
              <div
                key={index}
                className={`p-2 rounded ${event.type === 'event' ? 'bg-blue-100' : 'bg-red-100'}`}
              >
                <span className="font-semibold">{event.type === 'event' ? 'Event: ' : 'Reminder: '}</span>
                {event.title}
              </div>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <p>No events or reminders for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}