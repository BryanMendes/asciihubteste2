import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileById, updateProfileById } from '../fakeApi';

// --- Styled Components ---

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 100px 16px 32px;
  background-color: #f0f2f5;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #FFFFFF;
  border-radius: 11px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: none;
  color: #212529;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Header = styled.div`
  margin-bottom: 32px;
  h1 {
    color: #061380;
    font-size: 28px;
    font-weight: 700;
  }
`;

const CoverSection = styled.div`
  position: relative;
  margin-bottom: 80px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 180px;
  background-color: #C7E8F5;
  border-radius: 10px;
  object-fit: cover;
`;

const ProfilePhoto = styled.div`
  position: absolute;
  bottom: -45px;
  left: 24px;
`;

const ProfileCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgba(5, 67, 94, 0.48);
  border: 4px solid white;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CameraIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgb(87, 173, 94);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CoverButton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  button {
    background-color: #040A3D;
    color: rgb(255, 255, 255);
    border: none;
    padding: 8px 14px;
    font-size: 12px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 24px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    color: #333;
    font-size: 14px;
    margin-bottom: 6px;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    color: #333;
    font-size: 14px;
    resize: vertical;
    
    &:focus {
      outline: none;
      border-color: #061380;
      background-color: white;
    }
  }

  textarea {
    height: 100px;
  }
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 40px;

  button {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 0.9;
    }
  }

  .cancel {
    background-color: #6c757d;
    border: 1px solid #6c757d;
    color: #fff;
  }

  .save {
    background-color: #040A3D;
    border: none;
    color: white;
  }
`;

// --- Componente Principal ---
const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  const fileInputRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null);
  const [previewProfilePic, setPreviewProfilePic] = useState(null);
  const [previewCoverPic, setPreviewCoverPic] = useState(null);

  useEffect(() => {
    const currentProfile = getProfileById(id);
    if (currentProfile) {
      setProfile(currentProfile);
      setFormData({
        name: currentProfile.name || '',
        description: currentProfile.description || '',
        instagram: currentProfile.social.instagram || '',
        linkedin: currentProfile.social.linkedin || '',
        twitter: currentProfile.social.twitter || '',
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (target) => {
    setUploadTarget(target);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Converte para Base64
      reader.onloadend = () => {
        if (uploadTarget === 'profile') {
          setPreviewProfilePic(reader.result);
        } else if (uploadTarget === 'cover') {
          setPreviewCoverPic(reader.result);
        }
      };
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedData = {
      name: formData.name,
      description: formData.description,
      social: {
        ...profile.social,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
      },
      profilePic: previewProfilePic || profile.profilePic,
      coverPic: previewCoverPic || profile.coverPic,
    };
    updateProfileById(id, updatedData);
    navigate(`/perfil/${id}`);
  };

  if (!profile) {
    return <Page>Carregando...</Page>;
  }

  return (
    <Page>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />

      <Container>
        <BackButton onClick={() => navigate(`/perfil/${id}`)}>← Voltar</BackButton>
        <Header><h1>Editar Perfil</h1></Header>

        <CoverSection>
          <CoverImage src={previewCoverPic || profile.coverPic} alt="Imagem de capa" />
          <ProfilePhoto>
            <ProfileCircle>
              <img src={previewProfilePic || profile.profilePic} alt="Foto de perfil" />
              <CameraIcon onClick={() => handleImageClick('profile')}>
                <Camera size={16} color="#fff" />
              </CameraIcon>
            </ProfileCircle>
          </ProfilePhoto>
          <CoverButton>
            <button type="button" onClick={() => handleImageClick('cover')}>Alterar Capa</button>
          </CoverButton>
        </CoverSection>

        <Form onSubmit={handleSave}>
          <FormSection>
            <h2>Informações Gerais</h2>
            <FormGroup>
              <label>Nome</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange} 
              />
            </FormGroup>
            <FormGroup>
              <label>Biografia</label>
              <textarea 
                name="description" 
                value={formData.description || ''} 
                onChange={handleChange} 
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <h2>Redes Sociais</h2>
            <FormGroup>
              <label>Instagram</label>
              <input 
                type="text" 
                name="instagram" 
                value={formData.instagram || ''} 
                onChange={handleChange} 
                placeholder="https://instagram.com/usuario" 
              />
            </FormGroup>
            <FormGroup>
              <label>LinkedIn</label>
              <input 
                type="text" 
                name="linkedin" 
                value={formData.linkedin || ''} 
                onChange={handleChange} 
                placeholder="https://linkedin.com/in/usuario" 
              />
            </FormGroup>
             <FormGroup>
                <label>Twitter (X)</label>
                <input 
                    type="text" 
                    name="twitter" 
                    value={formData.twitter || ''} 
                    onChange={handleChange} 
                    placeholder="https://x.com/usuario" 
                />
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <button type="button" className="cancel" onClick={() => navigate(`/perfil/${id}`)}>Cancelar</button>
            <button type="submit" className="save">Salvar Alterações</button>
          </ButtonGroup>
        </Form>
      </Container>
    </Page>
  );
};

export default EditProfile;