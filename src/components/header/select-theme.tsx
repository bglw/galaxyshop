import React from 'react';

import { Listbox, Transition } from '@headlessui/react';
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/20/solid';

import { useTheme } from 'next-themes';
import { useIsMounted } from './use-is-mounted';

const THEMES = {
  dark: {
    id: 'dark',
    name: 'Dark',
    icon: MoonIcon,
  },
  light: {
    id: 'light',
    name: 'Light',
    icon: SunIcon,
  },
  system: {
    id: 'system',
    name: 'System',
    icon: ComputerDesktopIcon,
  },
};

export function SelectTheme() {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  const currentTheme = theme as keyof typeof THEMES;

  if (!isMounted()) {
    return null;
  }

  return (
    <Listbox value={theme} onChange={setTheme}>
      <div className="relative">
        <Listbox.Button
          aria-label="Select theme"
          className="
            inline-flex
            items-center

            p-2.5

            text-slate-500

            border
            border-gray-200
            rounded-lg
            bg-white

            transition
            duration-150

            focus-visible:ring-1
            focus-visible:ring-blue-500
            focus-visible:border-blue-500
            focus-visible:outline-none

            hover:bg-slate-50

            dark:text-white
            dark:bg-gray-900
            dark:border-gray-800
            dark:focus-visible:border-blue-500
          "
        >
          {React.createElement(THEMES[currentTheme].icon, {
            className: 'w-4 h-4',
          })}
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="
              absolute
              mt-1.5

              overflow-auto

              w-28
              max-h-60

              py-1.5

              border
              border-gray-200
              rounded-lg
              bg-white

              shadow-xs

              focus:outline-none

              dark:bg-gray-800
              dark:border-gray-100/5
            "
          >
            {Object.values(THEMES).map(({ id, name }) => (
              <Listbox.Option
                key={id}
                value={id}
                className={({ active }) => `
                  flex
                  items-center
                  justify-between

                  px-3
                  py-1.5

                  cursor-pointer
                  select-none

                  text-sm
                  font-semibold

                  transition-colors
                  duration-300

                  hover:text-blue-500
                  hover:bg-blue-50

                  dark:bg-gray-800
                  ${
                    active
                      ? 'text-blue-600 bg-slate-50 dark:bg-blue-500/10'
                      : 'text-slate-600 bg-white dark:text-white'
                  }
                `}
              >
                {name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
