import React from 'react';
import { NumPlaceItem } from '.';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DayPlaceList = ({dayPlan, setDayPlan, removePlace}) => {

  const handleChange = (result) => {
    if (!result.destination) return;
    // console.log(result);
    const items = [...dayPlan];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDayPlan(items);
  };

  return (
    <DragDropContext onDragEnd={handleChange}>
      <div className='plan-place-list'>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div className='place-list' 
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {
                // dayPlan이 있을 때만 표시
                dayPlan && dayPlan.map((place, index) => (
                  <Draggable key={index} draggableId={`draggable_${index}`} index={index}>
                    {(provided) => (
                      <div className='place-list-item' key={index} 
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <NumPlaceItem place={place} num={index + 1} focus={true}/>
                        <div className='btn-wrap'>
                          {/* <div className='move-btn'>
                            {
                              index === 0 ? "" : <button type='button' className='btn btn-sm' onClick={() => upPlace(index)}>↑</button>
                            }
                            {
                              index === dayPlan.length - 1 ? "" : <button type='button' className='btn btn-sm' onClick={() => downPlace(index)}>↓</button>
                            }
                          </div> */}
                        
                          {/* <button type='button' className='edit-btn btn btn-danger btn-sm' onClick={() => removePlace(index)}>−</button> */}
                          <button type='button' className='edit-btn btn btn-danger btn-sm' onClick={() => removePlace(index)}><span class="material-symbols-rounded">remove</span></button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DayPlaceList;