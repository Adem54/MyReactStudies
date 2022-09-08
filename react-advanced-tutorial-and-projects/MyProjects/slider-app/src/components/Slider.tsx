import { useEffect, useState } from "react";
import { SliderType } from "./slide.mode";

const Slider = (props: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const people = props.slides;

  const nextSlide = () => {
    if (props.slides.length === currentIndex + 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(props.slides.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    let slider = setInterval(() => {
      const lastIndex = props.slides.length - 1;
      if (currentIndex === lastIndex) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      //   setCurrentIndex(currentIndex+1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [currentIndex, props.slides]);

  return (
    <>
      <section className="section-center">
        {people.map((item: SliderType, index: number) => {
          const { image, name, title, quote, id } = item;
          console.log(name);

          let position = "nextSlide";
          if (index === currentIndex) {
            position = "activeSlide";
          }
          if (
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <main key={id} className={position}>
              <figure className="img-wrap">
                <img src={image} alt="manager" />
              </figure>
              <h4 className="name">{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <section>
                <i className="fa-solid fa-quote-right"></i>
              </section>
            </main>
          );
        })}

        <aside className="right-click" onClick={nextSlide}>
          <i className="fa-solid fa-angle-right"></i>
        </aside>
        <aside className="left-click" onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </aside>
      </section>
    </>
  );
};

interface SliderProps {
  slides: SliderType[];
}

export default Slider;
