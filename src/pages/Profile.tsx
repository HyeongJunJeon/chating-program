import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../img/image1.jpg";
import Camera from "../component/svg/Camera";
import Delete from "../component/svg/Delete";
import NavBar from "../component/Navbar";
import { storage, db, auth } from "../services/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState<any>({});
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {}
      };
      uploadImg();
    }
  }, [img]);

  //   const deleteImage = async () => {
  //     try {
  //       const confirm = window.confirm("프로필을 지우시겠습니까?");
  //       if (confirm) {
  //         await deleteObject(ref(storage, user.avatarPath));

  //         await updateDoc(doc(db, "users", auth.currentUser.uid), {
  //           avatar: "",
  //           avatarPath: "",
  //         });
  //         navigate("/", { replace: true });
  //       }
  //     } catch (err) {
  //       console.log("err");
  //     }
  //   };
  return user ? (
    <>
      <NavBar />
      <ProfileWrapper>
        <ProfileContainer>
          <ImgContainer>
            <img src={user.avatar || Img} alt="avatar" />
            <div className="overlay">
              <div>
                <label htmlFor="photo">
                  <Camera />
                </label>
                {/* {user.avatar ? <Delete deleteImage={deleteImage} /> : null} */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
          </ImgContainer>
          <TextContainer>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <hr />
            {/* <small>가입날짜: {user.createdAt.toDate().toString()}</small> */}
            <small>{user.name}님! 프로필 사진도 바꿔보세요!</small>
          </TextContainer>
        </ProfileContainer>
      </ProfileWrapper>
    </>
  ) : null;
};

export default Profile;

const ProfileWrapper = styled.section`
  width: 1100px;
  margin: 100px auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 700px;
  border: 1px solid #ff665c;
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  position: relative;
  margin-right: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ff665c;
    transition: 0.5s easi-in-out all;
  }

  :hover img {
    opacity: 0.4;
  }

  :hover .overlay {
    opacity: 1;
  }

  .overlay {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex-grow: 1;

  h3 {
    text-align: left;
  }
`;
