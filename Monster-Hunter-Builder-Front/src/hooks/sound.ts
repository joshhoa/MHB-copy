import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable import/prefer-default-export */
// This hook enables to play a sound
export const useSound = (sound: string) => {
  // create ref on an audio html element
  const audioElm = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (audioElm.current) {
      audioElm.current.currentTime = 0;
      // set max volume
      audioElm.current.volume = 0.2;
      audioElm.current.play();
    }
  }, []);

  // When using the hook, set new sound
  useEffect(() => {
    audioElm.current = new Audio(sound);
  }, [sound]);

  return playSound;
};
