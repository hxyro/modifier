import { useState } from 'react'
import { Col, Row } from 'reactstrap'
import Slideshow from './Slideshow'
import ogTele from '../../images/og-tele.jpeg'
import ogTwit from '../../images/og-twit.jpeg'
import ogLink from '../../images/og-link.jpeg'
import mdTele from '../../images/md-tele.jpeg'
import mdTwit from '../../images/md-twit.jpeg'
import mdLink from '../../images/md-link.jpeg'

const OgItems = [
  {
    src: ogTele,
    altText: 'Original link telegram preview',
    caption: 'Telegram',
    key: 1,
  },
  {
    src: ogTwit,
    altText: 'Original link twitter preview',
    caption: 'Twitter',
    key: 2,
  },
  {
    src: ogLink,
    altText: 'Original link linkedin preview',
    caption: 'LinkedIn',
    key: 3,
  },
]

const MdItems = [
  {
    src: mdTele,
    altText: 'Modified link telegram preview',
    caption: 'Telegram',
    key: 1,
  },
  {
    src: mdTwit,
    altText: 'Modified link twitter preview',
    caption: 'Twitter',
    key: 2,
  },
  {
    src: mdLink,
    altText: 'Modified link linkedin preview',
    caption: 'LinkedIn',
    key: 3,
  },
]

function Example() {
  const [activeIndex, setActiveIndex] = useState(1)
  const ITEMS = 3
  const next = (animating) => {
    if (animating) return
    const nextIndex = activeIndex === ITEMS - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = (animating) => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? ITEMS - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (animating, newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const props = {
    activeIndex,
    next,
    previous,
    goToIndex,
  }

  return (
    <>
      <h2 className="h2 mb-3">Demonstration</h2>
      <Row>
        <Col className="col-12 col-md-6 gy-3 gy-md-1">
          <h4>Modified URL</h4>
          <Slideshow items={MdItems} {...props} />
        </Col>
        <Col className="col-12 col-md-6 gy-5 gy-md-1">
          <h4>Original URL</h4>
          <Slideshow items={OgItems} {...props} />
        </Col>
      </Row>
    </>
  )
}

export default Example
