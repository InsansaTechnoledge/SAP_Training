import React, { useState } from 'react'
import OngoingEvent from '../Components/EventComponents/OngoingEvent'
import UpcomingEvent from '../Components/EventComponents/UpcomingEvent'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const EventPage = () => {

    const [date, setDate] = useState(new Date());

    return (
        <div className='pt-24 bg-theme-gradient grid grid-cols-3 px-12 gap-5 min-h-dvh pb-5'>
            <div className='col-span-2 space-y-5' >

                <div className='rounded-lg p-3 space-y-3 bg-card'>
                    <h1 className='text-secondary font-bold text-2xl'>Ongoing Events</h1>
                    <div className='grid grid-cols-3 gap-8 rounded-2xl'>
                        <OngoingEvent />
                        <OngoingEvent />
                        <OngoingEvent />
                    </div>
                </div>

                <div className='rounded-lg p-3 space-y-3 bg-card'>
                    <h1 className='text-secondary font-bold text-2xl'>Upcoming Events</h1>
                    <div className='grid grid-cols-3 gap-8 rounded-2xl'>
                        <UpcomingEvent />
                        <UpcomingEvent />
                        <UpcomingEvent />
                    </div>
                </div>

            </div>
            <div className='bg-card rounded-lg flex flex-col p-5'>
                <div className='border-contrast'>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="w-full"
                        tileClassName="p-2 text-center rounded-md transition-all duration-200 hover:bg-gray-300"
                    />

                </div>
            </div>
        </div>
    )
}

export default EventPage