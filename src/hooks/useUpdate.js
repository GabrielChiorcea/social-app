import { jokeActions } from '../store/jocke-slice';
import { useDispatch } from 'react-redux';
const useUpdate = () => {
  const dispatch = useDispatch();

  const mapPutVote = async (id, type, url) => {
    const sendId = id;
    const URL = url;

    let response;
    let comeFrom;
    if (URL === process.env.REACT_APP_URL_BANC) {
      comeFrom = 'AllJokes';
      response = await fetch(
        process.env.REACT_APP_PrefixNormalDB + sendId + '.json'
      );
    } else {
      comeFrom = 'Banc';
      response = await fetch(
        process.env.REACT_APP_PrefixMajorDB + sendId + '.json'
      );
    }
    // we drag an obj from firebase via id and this is how wee know the current value
    // in firebase. It a must to work like that because realtime database might be deferent
    //then the arry from Redux in some point
    const data = await response.json();
    let notIncremented = data.vote;
    

    let isIncrmented;

    if (type === 'increment') {
      isIncrmented = ++notIncremented;
    } else if (type === 'decrease' && notIncremented <= 0) {
      isIncrmented = notIncremented;
    } else {
      isIncrmented = --notIncremented;
    }

    const sendVote = { vote: isIncrmented };
    const newVote = sendVote.vote;
    const sendPayload = {
      comeFrom: comeFrom,
      id: sendId,
      vote: sendVote.vote,
    };

    let switchedUrl;
    // this if bloks are for switch the url, we can update firebase for normal jokes
    //and the jokes +18, the custome hook is used in all pages and if we vote a joke from
    //page JokesPlus we use URL_MAJOR
    if (URL === process.env.REACT_APP_URL_BANC) {
      switchedUrl = process.env.REACT_APP_PrefixNormalDB + sendId + '.json';
    } else if (URL === process.env.REACT_APP_URL_MAJOR) {
      switchedUrl = process.env.REACT_APP_PrefixMajorDB + sendId + '.json';
    }
    if (notIncremented > 0) {
      setTimeout(() => {
        fetch(switchedUrl, {
          method: 'PATCH',
          body: JSON.stringify({ vote: newVote }),
        });
      }, 700);
    }
    //after this fetch we know that the firebase is update, we update the vote key

    dispatch(jokeActions.upDateOldJokes(sendPayload));

    // this action find a specific obj in jokes arry from redux and upDATE it and UI will
    // display the right value
  };
  return { mapPutVote };
};

export default useUpdate;
