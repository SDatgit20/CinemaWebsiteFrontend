import React, { useState } from "react";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import styles from "./styles/showsStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useShows from "./hooks/useShows";
import {
  HEADER_DATE_FORMAT,
  INR_SYMBOL,
  QUERY_DATE_FORMAT,
} from "../../Constants";
import {
  dateFromSearchString,
  nextDateLocation,
  previousDateLocation,
} from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";
import SeatSelectionDialog from "./SeatSelectionDialog";
import PosterDialog from "./PosterDialog";

export default ({ location, history }) => {
  const classes = styles();
  const showsDate = dateFromSearchString(location.search);

  const { shows, showsLoading } = useShows(showsDate);
  const { showsRevenue, updateShowsRevenue, showsRevenueLoading } =
    useShowsRevenue(showsDate);
  const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
  const [showPosterDialog, setShowPosterDialog] = useState(false);
  const emptyShow = {
    id: "",
    date: "",
    cost: "",
    movie: {
      id: "",
      name: "",
      duration: "",
      plot: "",
      posterUrl: "",
    },
    slot: {
      id: "",
      name: "",
      startTime: "",
      endTime: "",
    },
  };
  const [selectedShow, setSelectedShow] = useState(emptyShow);

  var currentDate = new Date();
  var showDate = new Date(showsDate.format(QUERY_DATE_FORMAT));

  // const [isNotPreviousDate, setIsNotPreviousDate] = useState(true);
  var isNotPreviousDate;

  const isPastSlot = (startTime) => {
    var startTimeSplit = startTime.split(":");
    var adminBookingWindow = 30 * 60 * 1000;
    var showHours =
      startTimeSplit[1][3] === "P"
        ? Number(startTimeSplit[0]) + 12
        : Number(startTimeSplit[0]);
    var showMinutes =
      Number(startTimeSplit[1][0]) * 10 + Number(startTimeSplit[1][1]);
    showDate.setHours(showHours);
    showDate.setMinutes(showMinutes);
    showDate = new Date(showDate.getTime() + adminBookingWindow);
    isNotPreviousDate = !(showDate <= currentDate);
  };

  return (
    <>
      <div className={classes.cardHeader}>
        <Typography variant="h4" className={classes.showsHeader}>
          Shows ({showsDate.format(HEADER_DATE_FORMAT)})
        </Typography>
        {window.localStorage.getItem("rolename") === "customer" ? (
          <></>
        ) : (
          <ShowsRevenue
            showsRevenue={showsRevenue}
            showsRevenueLoading={showsRevenueLoading}
          />
        )}
      </div>
      <List className={classes.listRoot}>
        {shows.map((show) => (
          <div key={show.id} className={classes.showContainer}>
            <ListItem style={{ cursor: "pointer" }}>
              <ListItemAvatar
                classes={{ root: classes.localMoviesIcon }}
                onClick={() => {
                  setSelectedShow(show);
                  setShowPosterDialog(true);
                }}
              >
                <Avatar>
                  <img
                    src={show.movie.posterUrl}
                    alt="Poster"
                    height="40px"
                    width="40px"
                  ></img>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.showDetails}
                primary={show.movie.name}
                onClick={() => {
                  isPastSlot(show.slot.startTime);
                  setSelectedShow(show);
                  setShowSelectSeatDialog(isNotPreviousDate);
                }}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.slotTime}
                      color="textPrimary"
                    >
                      {show.slot.startTime}
                    </Typography>
                  </>
                }
              />
              <ListItemText
                primary={`${INR_SYMBOL}${show.cost}`}
                className={classes.price}
                primaryTypographyProps={{ variant: "h6", color: "secondary" }}
              />
            </ListItem>
          </div>
        ))}
      </List>

      <SeatSelectionDialog
        selectedShow={selectedShow}
        updateShowsRevenue={updateShowsRevenue}
        open={showSelectSeatDialog}
        onClose={() => setShowSelectSeatDialog(false)}
      />

      <PosterDialog
        selectedShow={selectedShow}
        open={showPosterDialog}
        onClose={() => setShowPosterDialog(false)}
      />

      <div className={classes.buttons}>
        {window.localStorage.getItem("rolename") === "customer" ? (
          <Button
            onClick={() => {
              history.push(previousDateLocation(location, showsDate));
            }}
            startIcon={<ArrowBackIcon />}
            color="primary"
            className={classes.navigationButton}
            style={{
              display:
                currentDate.getDate() !== showDate.getDate()
                  ? "inline-flex"
                  : "none",
            }}
          >
            Previous Day
          </Button>
        ) : (
          <Button
            onClick={() => {
              history.push(previousDateLocation(location, showsDate));
            }}
            startIcon={<ArrowBackIcon />}
            color="primary"
            className={classes.navigationButton}
          >
            Previous Day
          </Button>
        )}
        {window.localStorage.getItem("rolename") === "customer" ? (
          <Button
            onClick={() => {
              history.push(nextDateLocation(location, showsDate));
            }}
            endIcon={<ArrowForwardIcon />}
            color="primary"
            className={classes.navigationButton}
            style={{
              display:
                currentDate.getDate() + 2 > showDate.getDate()
                  ? "inline-flex"
                  : "none",
            }}
          >
            Next Day
          </Button>
        ) : (
          <Button
            onClick={() => {
              history.push(nextDateLocation(location, showsDate));
            }}
            endIcon={<ArrowForwardIcon />}
            color="primary"
            className={classes.navigationButton}
          >
            Next Day
          </Button>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={showsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
