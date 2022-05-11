import React from "react";
import {
  MdGrade,
  MdPerson,
  MdRateReview,
  MdThumbsUpDown,
} from "react-icons/md";
import { toast } from "react-toastify";
import useListings from "../hooks/useListings";
import ButtonEl from "./atoms/Button";
import InputEl from "./atoms/Input";

interface IProps {
  listingId: string;
  setReviewAdded: React.Dispatch<React.SetStateAction<boolean>>
}

const AddReview: React.FC<IProps> = ({ listingId, setReviewAdded }) => {
  const initialState = React.useMemo(() => {
    return { name: "", rating: "", review: "", listingId: listingId };
  }, []);
  const [data, setData] = React.useState(initialState);
  const { addReview } = useListings();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    if (
      isNaN(parseInt(data.rating)) ||
      parseInt(data.rating) < 1 ||
      parseInt(data.rating) > 10
    ) {
      toast.warn("Please enter a valid rating between 1 and 10");
      return;
    }
    if (!data.name || !data.review) {
      toast.warn("Please enter name and review");
      return;
    }
    await addReview(data);
    setReviewAdded(true)
    setData(initialState);
  };

  return (
    <div className="w-full md:min-w-[400px]">
      <h2 className="text-center text-2xl font-bold">Write a review</h2>
      <div className="p-[10px] md:p-[15px]">
        <div className="bg-[white] p-4 rounded-md shadow-md">
          <InputEl
            Icon={<MdPerson />}
            name="name"
            onChange={handleChange}
            placeholder="Name"
            type="text"
            value={data.name}
          />
          <InputEl
            Icon={<MdGrade />}
            name="rating"
            onChange={handleChange}
            type="number"
            placeholder="Rating"
            min={0}
            max={10}
            value={data.rating}
          />
          <InputEl
            Icon={<MdRateReview />}
            name="review"
            onChange={handleChange}
            placeholder="Review"
            type="text"
            value={data.review}
          />
          <ButtonEl
            Icon={<MdThumbsUpDown />}
            label="Post Review"
            callback={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddReview;
