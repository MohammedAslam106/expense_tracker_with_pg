import { Html, Button, Text, Heading } from "@react-email/components";

export default function VerifyEmailTemplate({username,otp}:{username:string,otp:string}) {
  return (
    <Html lang="en" dir="ltr">
        <Heading>
            Welcome to Expense Tracker.
        </Heading>
      {/* <Button href="https://example.com" style={{ color: "#61dafb" }}>
        Click me
      </Button> */}
      <Text style={{fontWeight:'bolder',fontSize:'28p'}} className=" font-bold text-[28px]">
        Hello {username},
      </Text>

      <Text style={{fontWeight:'bold',fontSize:'18px'}} className=" font-semibold text-[18px]">
        Verfication code for expense tracker is.
      </Text>

      <Text style={{fontWeight:'bold',fontSize:'20px'}} className=" font-semibold text-[20px]">
        OPT: {otp}
      </Text>

    </Html>
  );
};
