import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import { useRouter } from 'next/dist/client/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'

const Confirm = () => {

    const router = useRouter()
    const { pickup, dropoff } = router.query

    const [ pickupCoordinates, setPickupCoordinates ] = useState([0, 0])
    const [ dropoffCoordinates, setDropoffCoordinates ] = useState([0,0])

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: 'pk.eyJ1Ijoic2FyYWhkb25hZ2h1ZSIsImEiOiJja3ZtcXZtbHcweGliMm91cHpleTcwcmg5In0.TkRog74JG_prwqmW7j1ZQA',
                limit: 1
            })
        )
        .then(responce => responce.json())
        .then(data => {
            setPickupCoordinates(data.features[0].center);
        })
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token: 'pk.eyJ1Ijoic2FyYWhkb25hZ2h1ZSIsImEiOiJja3ZtcXZtbHcweGliMm91cHpleTcwcmg5In0.TkRog74JG_prwqmW7j1ZQA',
                limit: 1
            })
        )
        .then(responce => responce.json())
        .then(data => {
            setDropoffCoordinates(data.features[0].center);
        })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    return (
        <Wrapper>
            <ButtonContainer>
            <Link href="/search" passHref>
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
            </Link>
            </ButtonContainer>
            <Map
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
                />

                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>

    )
}

export default Confirm

const Wrapper = tw.div`
    flex h-screen flex-col
`

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`

const ConfirmButtonContainer = tw.div`
    border-t-2
`

const ConfirmButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center text-xl rounded-md cursor-pointer
`

const ButtonContainer = tw.div`
    bg-white absolute z-10 rounded-full top top-4 left-4 cursor-pointer shadow-md
`

const BackButton = tw.img`
    h-full cursor-pointer object-contain
`