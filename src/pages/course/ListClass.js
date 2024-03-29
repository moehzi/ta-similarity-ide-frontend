import React from 'react';
import { CardCourse } from '../../components/card';
const ListClass = ({
  data,
  myCourses,
  onClose,
  isOpen,
  onOpen,
  handleJoinCourse,
  setSelectedId,
}) => {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">List of all class</h1>
      <div className="flex flex-wrap gap-y-8 gap-x-6">
        {data
          ?.filter((v, i) => !myCourses?.some((v2) => v._id === v2._id))
          ?.map((course, i) => {
            return (
              <>
                <CardCourse
                  setSelectedId={setSelectedId}
                  onClose={onClose}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  id={course._id}
                  key={`card-course-${i}`}
                  onJoinCourse={handleJoinCourse}
                  name={course.name}
                  isMyCourses={false}
                  author={course.author[0]?.name}
                  total_assignment={course.works.length}
                  works={[]}
                />
              </>
            );
          })}
      </div>
    </>
  );
};

export default ListClass;
