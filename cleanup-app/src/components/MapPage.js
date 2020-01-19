import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const MapPage = props => {
  console.log('hi')

  const [isModalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalDescription, setModalDescription] = useState('')
  const [pos, setPos] = useState(null)

  const handleClick = markerProps => {
    setModalVisible(!isModalVisible)
    setModalTitle(markerProps.title)
    setModalDescription(markerProps.description)
    setPos(markerProps.position)
    props.setCollapse(true)
  }
  const handleOk = () => {
    console.log(props)
    setModalVisible(!isModalVisible)
    const token = jwt.sign(
      { title: modalTitle, description: modalDescription, pos: pos },
      'secwet'
    )
    props.history.push({
      pathname: `/details`,
      search: `${token}`,
      state: {},
    })
  }

  const handleCancel = () => {
    setModalVisible(!isModalVisible)
  }

  let defaultProps = {
    center: {
      lat: 36.962043,
      lng: -122.007636,
    },
    zoom: 13,
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      defaultProps.center.lat = position.coords.latitude
      defaultProps.center.lng = position.coords.longitude
    })
  }

  return (
    <div>
      <Modal
        title={modalTitle}
        pos={pos}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'More'}
      >
        <p>{modalDescription}</p>
      </Modal>
      <h1>MAP PAGE</h1>

      <Map
        google={props.google}
        style={{ width: '100%', height: '100%' }}
        defaultCenter={defaultProps.center}
        zoom={defaultProps.zoom}
        initialCenter={defaultProps.center}
      >
        <Marker
          position={{ lat: 37.453639, lng: -122.445115 }}
          title={'Beach 1'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }
          onClick={handleClick}
        />
        <Marker
          position={{ lat: 36.971454, lng: -121.952722 }}
          title={'Beach 2'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }
          onClick={handleClick}
        />
        <Marker
          position={{ lat: 36.963261, lng: -122.009431 }}
          title={'Beach 3'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }
          onClick={handleClick}
        />
        <Marker
          position={{ lat: 36.549343, lng: -121.929567 }}
          title={'Beach 4'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }
          onClick={handleClick}
        />
        <Marker
          position={{ lat: 37.004131, lng: -122.185773 }}
          title={'Beach 5'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }
          onClick={handleClick}
        />
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDVbQIZYWFU5zfuxRW1Ogt-9GAnmuznuwc',
})(withRouter(MapPage))
