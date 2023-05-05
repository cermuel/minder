import AuthContextContainer from "./Auth/index";
import MobileContextContainer from "./Mobile/index";
import UserContextContainer from "./UserContext";

const AllContextContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <MobileContextContainer>
        <AuthContextContainer>
          <UserContextContainer>{children}</UserContextContainer>
        </AuthContextContainer>
      </MobileContextContainer>
    </>
  );
};

export default AllContextContainer;
