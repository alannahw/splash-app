import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import { BtnSimpleStyle } from "../util/styled";

const CtStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const OverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
`;
const ImgStyle = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
const DetailsStyle = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  a {
    line-height: 1.5em;
    text-decoration: none;
    font-size: 14px;
    color: #fff;
    vertical-align: bottom;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  }
`;
const ReloadBtnStyle = BtnSimpleStyle.extend`
  height: 3em;
  width: 3em;
  background: linear-gradient(#efefef, #ddd);
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  &::after {
    font-family: "Ionicons";
    content: "\f21c";
    font-size: 21px;
    color: #333;
    padding: 1px;
  }
`;
const PhotoLinkStyle = styled.a`
  width: 1em;
  height: 1em;
  margin-right: 10px;
  text-decoration: none;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  &::after {
    font-family: "Ionicons";
    content: "\f2d3";
    font-size: 21px;
    color: #fff;
  }
`;

class UnsplashImg extends Component {
  handleReloadImgBtn = () => {
    const random = _.sample(this.props.imgs).id;
    this.props.reloadImgId(random);
  };
  render() {
    const { h, w, imgs, imgId } = this.props;
    let picUrl = "";
    let display = "";
    let details = "";

    if (imgs.length && imgId) {
      display = imgs.find(i => i.id === imgId);
      picUrl = `https://picsum.photos/${w}/${h}/?image=${imgId}`;
      if (display) {
        details = (
          <div>
            <PhotoLinkStyle target="_blank" href={display.post_url} />
            <a target="_blank" href={display.author_url}>
              {display.author}
            </a>
          </div>
        );
      }
    }
    return (
      <CtStyle>
        <ImgStyle src={picUrl} />
        <OverlayStyle />
        <DetailsStyle>{details}</DetailsStyle>
        <ReloadBtnStyle onClick={this.handleReloadImgBtn} />
      </CtStyle>
    );
  }
}

export default UnsplashImg;
