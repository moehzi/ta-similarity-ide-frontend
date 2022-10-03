/* eslint-disable react-hooks/rules-of-hooks */
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Works } from '../../pages/course';
import ModalJoin from './Modal';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Link,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ModalEditCourse from '../../pages/course/ModalEditCourse';
interface CardCourseProps {
  id: string;
  name: string;
  isTeacher: boolean;
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
  onOpenEdit?: () => void;
  setSelectedId?: (classId: String) => void;
  setCourseId?: (classId: string) => void;
  handleEditCourse?: () => void;
  courseName?: string;
  courseId?: string;
  isOpenEdit?: boolean;
  onCloseEdit?: () => void;
  setCourseName?: (courseName: string) => void;
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
  isTeacher,
  onClose,
  isOpen,
  onOpen,
  onOpenEdit,
  setSelectedId,
  setCourseId,
  handleEditCourse,
  courseName,
  isOpenEdit,
  onCloseEdit,
  courseId,
  setCourseName,
}: CardCourseProps) => {
  const cancelRef = React.useRef();

  const handleOpen = (classId: string) => {
    onOpen?.();
    setSelectedId?.(classId);
  };

  const handleEdit = (courseId: string) => {
    onOpenEdit?.();
    setCourseId?.(courseId);
    handleEditCourse?.();
  };
  return (
    <div>
      <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl w-[350px]">
        <div
          className={
            isTeacher
              ? 'flex-row-reverse flex justify-between'
              : 'flex items-end'
          }
        >
          {isTeacher && (
            <>
              <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                  <IconButton
                    aria-label="More server options"
                    icon={<BsThreeDotsVertical />}
                    variant="ghost"
                    w="fit-content"
                  />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                  <PopoverArrow />
                  <PopoverBody>
                    <Stack>
                      <Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<EditIcon />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        colorScheme="green"
                        fontSize="sm"
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </Button>
                      <Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<DeleteIcon />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        colorScheme="red"
                        fontSize="sm"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          )}
          <div className="flex flex-col p-6 font-semibold ">
            <Link onClick={onClick}>
              <Text noOfLines={1} fontSize="lg">
                {name}
              </Text>
            </Link>
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
          </div>
          {!isMyCourses && (
            <div className="p-6">
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
            </div>
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
