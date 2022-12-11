import ContentLayout from '../../components/common/ContentLayout'
import ItemsContainer from '../../components/common/ItemsContainer'
import RoomCardWrapper from '../../components/common/RoomCardWrapper'
import GitHubComponent from '../../components/SvgComponents/GitHubComponent'
import VKComponent from '../../components/SvgComponents/VKComponent'
import TGComponent from '../../components/SvgComponents/TGComponent'
const Contacts = () => {
  return (
    <ContentLayout>
      <ItemsContainer>
        <RoomCardWrapper>
          <img
            src="https://i.ibb.co/2nCDq0z/image.png"
            alt="github"
            style={{
              width: '80%',
              borderRadius: '10px',
            }}
          />

          <GitHubComponent size="50px" color="black" />
        </RoomCardWrapper>
        <RoomCardWrapper>
          <img
            src="https://i.ibb.co/PTysM1c/image.png"
            alt="github"
            style={{
              width: '80%',
              borderRadius: '10px',
            }}
          />

          <VKComponent size="50px" color="black" />
        </RoomCardWrapper>
        <RoomCardWrapper>
          <img
            src="https://i.ibb.co/8BHmsQj/photo-2022-12-11-21-24-10.jpg"
            alt="github"
            style={{
              width: '80%',
              borderRadius: '10px',
            }}
          />

          <TGComponent size="50px" color="black" />
        </RoomCardWrapper>
      </ItemsContainer>
    </ContentLayout>
  )
}

export default Contacts
