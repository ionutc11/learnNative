import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchPlaces()
        .then((res) => {
          setLoadedPlaces(res);
        })
        .catch(console.log);

        
      // const place = route.params.place;
      // setLoadedPlaces((prev) => [...prev, place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
