"use client";

import MeetingTypeList from '@/components/MeetingTypeList'
import { useGetCalls } from '@/hooks/useGetCalls';

import {
  StreamCall,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

const Home = () => {

  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' })).format(now);

  const call = useCall();
  const { useCallStartsAt } = useCallStateHooks();
  const { upcomingCalls } = useGetCalls()
  return (
    <StreamCall call={call}>

      <section className='flex size-full flex-col gap-10 text-white'>
        <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
          <div className='flex h-full flex-col px-6 py-6 justify-between max-md:px-5 max-md:py-8 lg:p-11'>
            { upcomingCalls.length > 0 ? (
              <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-bold flex-col '>
                <p className='font-normal'>Upcoming Meeting at: </p>
                {
                  `${upcomingCalls[0]?.state?.startsAt?.toLocaleString('en-IN', {
                    hour: '2-digit', minute: '2-digit', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'
                  })}`
                }
              </h2>
              ) : <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-bold flex-col '>No Upcoming Meets</h2>
            }
            <div className='flex flex-col gap-2'>
              <h1 className='text-5xl font-extrabold lg:text-7xl'>
                {time}
              </h1>
              <p className='text-lg font-medium text-sky-1 lg:text-2xl pl-2'>{date}</p>
            </div>
          </div>
        </div>

        <MeetingTypeList />

      </section>
    </StreamCall>
  )
}

export default Home