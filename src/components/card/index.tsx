/* eslint-disable react-hooks/rules-of-hooks */
import { useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
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
}

export const CardCourse = ({
  id,
  name,
  author,
  total_assignment,
  recent_assignment,
  works,
  isMyCourses,
  onJoinCourse,
  onClose,
  isOpen,
  onOpen,
}: CardCourseProps) => {
  const cancelRef = React.useRef();
  return (
    <div>
      <div className="flex flex-col justify-between items-center overflow-hidden duration-200 bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl w-[350px]">
        <div className="flex flex-col w-full p-4 font-semibold text-indigo-600 ">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="mb-4 text-xs text-gray-400">Lecturer: {author}</p>

          {isMyCourses && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-600">Most Recent</p>
              <p className="mt-2 text-sm">
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
                onClick={onOpen}
              >
                Join Course
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
          <div className="w-full p-4 text-indigo-100 bg-indigo-600">
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
