import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState, useCallback } from "react";
import { fetchToken } from "../Apicalls/Aesehi";
import { useAuthStore } from "../Apicalls/Auth.api";

const apiKey = "wsvmwccdgb9z";

export default function AudioCall({ toUserId, type, onEnd, isInitiator }) {
  const { user } = useAuthStore();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);

  // Memoize cleanup function to prevent recreating on every render
  const cleanup = useCallback(async (callInstance, clientInstance) => {
    try {
      if (callInstance) {
        await callInstance.leave();
        await callInstance.camera.disable();
      }
      if (clientInstance) {
        await clientInstance.disconnectUser();
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }, []);

  const handleCallEnd = useCallback(() => {
    cleanup(call, client);
    setCall(null);
    setClient(null);
    setIsJoining(false);
    onEnd();
  }, [call, client, cleanup, onEnd]);

  useEffect(() => {
    if (!user?._id || !toUserId || isJoining) return;

    let isMounted = true;
    let clientInstance = null;
    let activeCall = null;

    const initializeCall = async () => {
      try {
        setIsJoining(true);
        setError(null);

        const token = await fetchToken();
        const userId = user._id;

        if (!isMounted) return;

        // Create client
        clientInstance = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: user?.name,
            image: user?.userImage || undefined,
          },
          token,
        });

        if (!isMounted) {
          await cleanup(null, clientInstance);
          return;
        }

        // Create consistent call ID
        const callId = [userId, toUserId].sort().join("_");
        activeCall = clientInstance.call("default", callId);

        if (!isMounted) {
          await cleanup(activeCall, clientInstance);
          return;
        }

        // Join call only once
        const isAlreadyJoined = activeCall.state.members && 
                                activeCall.state.members[userId];
        
        if (!isAlreadyJoined) {
          await activeCall.join({ create: isInitiator });
        }

        if (!isMounted) {
          await cleanup(activeCall, clientInstance);
          return;
        }

        // Disable camera for audio calls
        if (type === "audio") {
          await activeCall.camera.disable();
        }

        if (isMounted) {
          setClient(clientInstance);
          setCall(activeCall);
          setIsJoining(false);
        }
      } catch (error) {
        console.error('Call initialization error:', error);
        if (isMounted) {
          setError(error.message);
          setIsJoining(false);
        }
        // Clean up on error
        await cleanup(activeCall, clientInstance);
      }
    };

    initializeCall();

    return () => {
      isMounted = false;
      // Cleanup will be handled by the cleanup function
      if (activeCall || clientInstance) {
        cleanup(activeCall, clientInstance);
      }
    };
  }, [user?._id, toUserId, type, isInitiator, cleanup]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Call Error</h3>
          <p className="mb-4">{error}</p>
          <button
            onClick={handleCallEnd}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (isJoining || !client || !call) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Connecting to call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout showAvatarOnCamOff={true} />
            <CallControls onLeave={handleCallEnd} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    </div>
  );
}