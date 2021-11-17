import { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/link'
import axios from 'axios'

const Search = () => {

    const [pickup, setPickup] = useState({
        value: "",
        list: [
            {
                placeName: null,
                coordinates: [],
            },
        ],
        isFocused: false,
    });

    const [dropoff, setDropoff] = useState({
        value: "",
        list: [
            {
                placeName: null,
                coordinates: [],
            },
        ],
        isFocused: false,
    });

    const MAP_BOX_API_KEY =
    'pk.eyJ1Ijoic2FyYWhkb25hZ2h1ZSIsImEiOiJja3ZtcXZtbHcweGliMm91cHpleTcwcmg5In0.TkRog74JG_prwqmW7j1ZQA';
    
    useEffect(() => {
        if (pickup.value) {
            axios
                .get(getMapBoxURL(pickup.value))
                .then((response) => {
                    setPickup((prevPickup) => ({
                        ...prevPickup,
                        list: response.data.features.map((item) => ({
                            placeName: item.place_name,
                            coordinates: item.center,
                        })),
                    }));
                })
                .catch((err) => console.log(err));
        } else {
            setPickup((prevPickup) => ({ ...prevPickup, list: [] }));
        }
    }, [pickup.value]);
        
    useEffect(() => {
        if (dropoff.value) {
            axios
                .get(getMapBoxURL(dropoff.value))
                .then((response) => {
                    setDropoff((prevDropoff) => ({
                        ...prevDropoff,
                        list: response.data.features.map((item) => ({
                            placeName: item.place_name,
                            coordinates: item.center,
                        })),
                    }));
                })
                .catch((err) => console.log(err));
        } else {
            setDropoff((prevDropoff) => ({ ...prevDropoff, list: [] }));
        }
    }, [dropoff.value]);

    const getMapBoxURL = (input) =>
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?worldview=cn&access_token=${MAP_BOX_API_KEY}`;
        

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/" passHref>
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </ButtonContainer>
            <InputContainer>
                <FromToIcons>
                    <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
                    <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
                    <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
                </FromToIcons>
                <InputBoxes>
                    <div className="relative w-full">
                        <Input
                            placeholder="Enter Pickup Location"
                            value={pickup.value}
                            onChange={(e) =>
                                setPickup((prevPickup) => ({
                                    ...prevPickup,
                                    value: e.target.value,
                                }))
                            }
                            onFocus={() =>
                                setPickup((prevPickup) => ({ ...prevPickup, isFocused: true }))
                            }
                        />
                        <SearchSuggestions
                            list={pickup}
                            setState={(item) => {
                                setPickup((prevPickup) => ({
                                    ...prevPickup,
                                    value: item.placeName,
                                    coordinates: item.coordinates,
                                    isFocused: false,
                                }));
                            }}
                        />
                    </div>
                    <div className="relative w-full">
            <Input
                placeholder="Where To ?"
                value={dropoff.value}
                onChange={(e) =>
                setDropoff((prevDropoff) => ({ ...prevDropoff, value: e.target.value }))
                }
                onFocus={() =>
                setDropoff((prevDropoff) => ({ ...prevDropoff, isFocused: true }))
                }
            />
            <SearchSuggestions
                list={dropoff}
                setState={(item) => {
                    setDropoff((prevDropoff) => ({
                    ...prevDropoff,
                        value: item.placeName,
                        coordinates: item.coordinates,
                        isFocused: false,
                    }));
                }}
            />
          </div>
                </InputBoxes>
                <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
            </InputContainer>
            <SavedPlaces>
                <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
                Saved Places
            </SavedPlaces>
            <Link href={{
                pathname: "/confirm",
                query: {
                    pickup: pickup.value,
                    dropoff: dropoff.value,
                }
            }} passHref>
                <ConfirmLocation>Confirm Locations</ConfirmLocation>
            </Link>

            {/* Button Container */}
            {/* Input Container */}
            {/* Saved Places */}
            {/* Confirm Location */}
        </Wrapper>
    )
};

const SearchSuggestions = ({ list, setState }) => {
    if (list.isFocused) {
      return (
        <div className="absolute bg-white z-50 w-full shadow-md px-2 cursor-pointer">
          {list.list?.map((item, index) => (
            <div
              onClick={() => setState(item)}
              key={index}
              className="mb-1 border-b last:border-b-0"
            >
              <div>
                <h3>{item.placeName}</h3>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

export default Search;

const Wrapper = tw.div`
    bg-gray-200 h-screen
`

const ButtonContainer = tw.div`
    bg-white px-4 
`

const BackButton = tw.img`
    h-12 cursor-pointer
`

const InputContainer = tw.div`
    bg-white flex items-center px-4 pb-2 mb-2
`

const FromToIcons = tw.div`
    w-10 flex flex-col mr-2 items-center
`

const Circle = tw.img`
    h-2.5
`

const Line = tw.img`
    h-10
`

const Square = tw.img`
    h-3
`

const InputBoxes = tw.div`
    flex flex-col flex-1
`

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-md p-2 outline-none border-none w-full
`

const PlusIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3
`

const SavedPlaces = tw.div`
    flex items-center bg-white px-4 py-2
`

const StarIcon = tw.img`
 bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`

const ConfirmLocation = tw.div`
    bg-black text-white mt-2 mx-4 p-2 text-center text-2xl rounded-md cursor-pointer border-white border-solid border-4
`