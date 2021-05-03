import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICat } from '../models/ICat';
import { getAllCats, setFavourite, setVoteUpDown } from '../redux/actions/cat';
import { IStore } from '../redux/stores/IStore';
import { Button, Container, createStyles, CssBaseline, GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, makeStyles, Theme } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);


const mapStateToProps = (store: IStore) => {
  return {
    cats: store.catState.cats
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    getAllCats: () => dispatch(getAllCats()),
    setFavourite: (cat: ICat) => dispatch(setFavourite(cat)),
    setVoteUpDown: (cat: ICat) => dispatch(setVoteUpDown(cat))
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps);

type HomeProps = ConnectedProps<typeof connector>;

const Home: React.FC<HomeProps> = ({ cats, getAllCats, setFavourite, setVoteUpDown }) => {
  const classes = useStyles();

  const [isCatsLoaded, setIsCatsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isCatsLoaded) {
      if (cats.length == 0) {
        getAllCats();
      }
      setIsCatsLoaded(true);
    }
  });

  const _setFavourite = (cat: ICat): void => {
    cat.isFavorite = !cat.isFavorite;
    console.log('Favourite button clicked', cat);
    setFavourite(cat);
  }
  const _setVoteUpDown = (cat: ICat): void => {
    cat.isVoteUp = !cat.isVoteUp;
    console.log('Vote up button clicked', cat);
    setVoteUpDown(cat);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Cats</ListSubheader>
            </GridListTile>
            {cats.map((cat: ICat) => (
              <GridListTile key={cat.url}>
                <img src={cat.url} />
                <GridListTileBar
                  titlePosition='top'
                  actionPosition='left'
                  actionIcon={
                    <IconButton className={classes.icon} onClick={() => { _setVoteUpDown(cat); }}>
                      {cat.isVoteUp ?<ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                  }
                />
                <GridListTileBar
                  title={`Scores: ${cat.scores}`}
                  actionIcon={
                    <IconButton className={classes.icon} onClick={() => { _setFavourite(cat); }}>
                      {cat.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default connector(Home);