import styled from 'styled-components';

const AlbumCard = styled.div`
  position: relative;
  perspective: 1000px;
  width: 210px;
  height: 210px;
  margin: 10px auto;
  cursor: pointer;

  .album-card {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &.flipped {
      transform: rotateY(180deg);
    }
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .front {
    background: rgba(99, 98, 98, 0.37);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;
    color: white;
  }

  .back {
    background: rgba(99, 98, 98, 0.37);
    transform: rotateY(180deg);
    display: flex;
    align-items: left;
    justify-content: left;
    color: white;
    border-radius: 10px;
  }

  .album-image {
    max-width: 180px;
    max-height: 180px;
    object-fit: cover;
  }
`;

export default AlbumCard;
