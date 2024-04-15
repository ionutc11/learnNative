import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {

  function createPlaceHandler(place) {
    insertPlace(place)
      .then((res) => {
        navigation.navigate("AllPlaces");
      })
      .catch((err) => console.log(err));
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
