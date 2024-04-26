'use client';

import { useState } from 'react'
import Loader from '@/components/Loader';
import { useGetCallById } from '@/hooks/useGetCallById';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import Alert from '@/components/Alert';

import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

const Meeting = ({ params: { id } }: { params: { id: string }}) => {

  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;


  return (
    <main className='h-screen w-full'>
      <StreamCall call={ call }>
        <StreamTheme>
          { !isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting