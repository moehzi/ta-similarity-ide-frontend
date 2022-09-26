/* eslint-disable react-hooks/rules-of-hooks */
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Works } from '../../pages/course';
import ModalJoin from './Modal';
interface CardCourseProps {
  id: string;
  name: string;
  author: string;
  total_assignment: number;
  recent_assignment?: string;
  works: Works[];
  isMyCourses: boolean;
  onJoinCourse?: (e: React.MouseEvent) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: () => void;
  setSelectedId?: (classId: String) => void;
}

export const CardCourse = ({
  id,
  name,
  author,
  total_assignment,
  recent_assignment,
  works,
  onClick,
  isMyCourses,
  onJoinCourse,
  onClose,
  isOpen,
  onOpen,
  setSelectedId,
}: CardCourseProps) => {
  const cancelRef = React.useRef();

  const handleOpen = (classId: string) => {
    onOpen?.();
    setSelectedId?.(classId);
  };
  return (
    <div onClick={onClick}>
      <div className="flex flex-col justify-between items-center overflow-hidden duration-200 bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl w-[350px]">
        <div className="flex flex-col w-full p-6 font-semibold ">
          <Text noOfLines={1} fontSize="lg">
            {name}
          </Text>
          <p className="my-2 text-xs font-light text-gray-400">
            Lecturer : {author}
          </p>

          {isMyCourses && (
            <div className="mt-4">
              <p className="text-xs">Most Recent</p>
              <p className="mt-2 font-semibold text-md">
                {recent_assignment?.length
                  ? recent_assignment
                  : 'No recent assignment'}
              </p>
            </div>
          )}

          {!isMyCourses && (
            <>
              <button
                className="py-2 text-indigo-100 text-xs font-semibold duration-75 bg-indigo-600 rounded-md hover:bg-indigo-500 hover:shadow-md w-[100px] ml-auto mr-0"
                onClick={() => handleOpen(id)}
                id={id}
              >
                Join Class
              </button>
              <ModalJoin
                id={id}
                handleJoinCourse={onJoinCourse}
                isOpen={isOpen}
                cancelRef={cancelRef}
                onClose={onClose}
              />
            </>
          )}
        </div>
        {isMyCourses && (
          <div className="w-full p-4 text-indigo-100 bg-[#1C3879]">
            <p>
              {total_assignment}{' '}
              {total_assignment > 1 ? 'assignments' : 'assignment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
