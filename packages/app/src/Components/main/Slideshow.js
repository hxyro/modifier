import React, { useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap'

const Slideshow = (props) => {
  const [animating, setAnimating] = useState(false)

  const slides = props.items.map((item) => {
    return (
      <CarouselItem
        className="item"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionHeader="" captionText="" />
      </CarouselItem>
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div style={{ flex: '1' }}>
        <Carousel
          activeIndex={props.activeIndex}
          next={() => props.next(animating)}
          previous={() => props.previous(animating)}
          dark={false}
          slide={true}
          className="text-center bg-dark slide text-primary"
        >
          <CarouselIndicators
            items={props.items}
            activeIndex={props.activeIndex}
            onClickHandler={(newIndex) => props.goToIndex(animating, newIndex)}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={() => props.previous(animating)}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={() => props.next(animating)}
          />
        </Carousel>
      </div>
      <div style={{ justifySelf: 'end' }}>
        <span className="my-2 p-2 text-white lead bg-secondary rounded-1 d-inline-block">
          {props.items[props.activeIndex].caption}
        </span>
      </div>
    </div>
  )
}

export default Slideshow
