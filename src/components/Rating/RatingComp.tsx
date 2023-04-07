import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import "./Rating.scss";
import { useParams } from "react-router-dom";

type Props = {};

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 55 }} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" sx={{ fontSize: 55 }} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: 55 }} />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: 55 }} />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: 55 }} />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return (
    <span style={{ height: 55, width: 55 }} {...other}>
      {customIcons[value].icon}
    </span>
  );
}

const RatingComp = (props: Props) => {
  const [value, setValue] = React.useState<number | null>(1);
  const query = useParams();

  return (
    <div className="rating">
      <h1> It was a great to have you with us. Please rate our hospitality.</h1>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={1}
        value={value}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
        sx={{ fontSize: 100 }}
      />
      <textarea
        className="review"
        placeholder="Review..."
        rows={10}
        cols={50}
      />

      <h1>Thank You for your Feedback</h1>
      <img src={require("../../assets/check-green.gif")} alt="done" />
    </div>
  );
};

export default RatingComp;
