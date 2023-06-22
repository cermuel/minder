import AuthContextContainer from "./Auth/index";
import MobileContextContainer from "./Mobile/index";

const AllContextContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <MobileContextContainer>
        <AuthContextContainer>{children}</AuthContextContainer>
      </MobileContextContainer>
    </>
  );
};

export default AllContextContainer;
