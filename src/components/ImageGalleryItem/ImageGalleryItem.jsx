import { Component } from 'react';
import { Modal } from 'components/Modal';
import {
  GalleryItem,
  GalleryItemImage,
  GalleryItemButton,
} from './ImageGalleryItem.styled';
import { Img } from 'components/Modal/Modal.styled';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { showModal } = this.state;
    const { toggleModal } = this;
    return (
      <GalleryItem>
        <GalleryItemButton type="button" onClick={toggleModal}>
          <GalleryItemImage className="img" src={webformatURL} alt={tags} />
        </GalleryItemButton>
        {showModal && (
          <Modal onClose={toggleModal}>
            <Img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}
