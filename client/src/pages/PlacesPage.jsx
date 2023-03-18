import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios'
import PhotosUploader from '../PhotosUploader';

const PlacesPage = () => {
    const {action} = useParams();
    const[title, setTitle] = useState('')
    const[address, setAdress] = useState('')
    const [description, setDescription] = useState('')
    const[addedPhotos, setAddedPhotos] = useState([])
    const[perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);
    

    const inputHeader = (text) => {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
        
    }

    const preInput= (header, description) => {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
        )
        
    }

    const addNewPlace = async (e) => {
        e.preventDefault();
    await axios.post('/places', {
        title, address, 
        addedPhotos, description, perks, 
        extraInfo, checkIn, checkOut, 
        maxGuests
    });
    setRedirectToPlacesList(true)
    }

    if(redirectToPlacesList && action !== 'new')
    {
        return <Navigate to={'/account/places'}/>
    }



  return (
    <div>
        {action !== 'new' && (
             <div className='text-center'>
             <Link className=' inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'to={'/account/places/new'}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
 
                 Add new Place
                 </Link>
         </div>
        )}
        {action === 'new' && (
            <div>
                <form onSubmit={addNewPlace}>
                    {preInput('Title','Title for your place, make it short and catchy!' )}
                    <input type="text" placeholder='title, for example: One bedroom apartment by the sea' value={title} onChange={e => setTitle(e.target.value)}/>
                    {preInput('Address', 'Address to the location')}
                    <input type="text" placeholder='address' value={address} onChange={e=> setAdress(e.target.value)}/>
                    {preInput('Photos', 'more = better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    
                    {preInput('Description', 'description of the place')}
                    <textarea value={description} onChange={e => setDescription(e.target.value)}/>
                    {preInput('Perks', 'select the perks you can provide')}
                    <Perks selected={perks} onChange={setPerks}/>
                    {preInput('Extra info', 'house rules, etc')}
                     <textarea value={extraInfo} onChange={e=> setExtraInfo(e.target.value)}/>
                     {preInput('Check in & out times, max guests', 'add check in and out times, remember to have some time window for cleaning the room between guests. ')}
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" value={checkIn} onChange={e=> setCheckIn(e.target.value)} placeholder='14:00'/>
                        </div>
                        <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" value={checkOut} onChange={e=> setCheckOut(e.target.value)} placeholder='11:00'/>
                        </div>
                        <div>
                        <h3 className='mt-2 -mb-1'>Maximum Guests</h3>
                        <input type="number" placeholder='2'value={maxGuests} onChange={e=> setMaxGuests(e.target.value)}/>
                        </div>
                    </div>
                        <button className='primary my-4'>Save</button>
                </form>
            </div>
        )}
     
    </div>
  )
}

export default PlacesPage
