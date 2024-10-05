import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://www.cnet.com/a/img/resize/0631fa42e6a18606edec9b0bd261df794e8d1cb3/hub/2018/11/20/7c698e7f-195f-4820-9505-87311e466f75/klmajor2-2.jpg?auto=webp&fit=crop&height=675&width=1200"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>
          GG Republic – Your Ultimate Dota 2 Hub
        </Typography>
        <div
          onClick={() => window.open("https://www.ggrepublic.com/", "_blank")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={medium}>ggrepublic.com</Typography>
        </div>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Discover everything you need to know about Dota 2 in one place. From the
        latest news to live match updates, tournament details, in-depth
        statistics, or expert insights, GG Republic has got you covered.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
