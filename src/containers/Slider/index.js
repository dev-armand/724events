import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {

  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // modification from: new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 
    new Date(evtB.date) > new Date(evtA.date) ? 1 : -1
  );

  const nextCard = () => {
    // ajout de if (byDateDesc)
    if (byDateDesc) {
    setTimeout(
      // add -1 to byDateDesc.length
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      5000
    );
    }
  };
  useEffect(() => {
    nextCard();
  });

  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout de <div key={event.title}> autour des éléments qui rend chaque itération du mapping unique
         <div key={event.title} >
         <div className={`SlideCard SlideCard--${
                 index === idx ? "display" : "hide"
             }`}
         >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
         </div>
         <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                // change from event.id
                  key={`${e.title}`}
                  type="radio"
                  name="radio-button"
                  // change idx to index 
                  checked={index === radioIdx}
                  // add readOnly
                  readOnly
                />
              ))}
            </div>
         </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
