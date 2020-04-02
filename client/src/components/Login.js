import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5%;
`;

const Form = styled.form`
  width: 200px;
  text-align: center;
`;

const Input = styled.input`
  text-align: center;
  border: grey SOLID 1px;
  border-radius: 5px;
  padding: 2%;
  margin: 5%;
  font-size: 1rem;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUsername()) {
      console.log(username, password);
      setUsername('');
      setPassword('');
    } else {
      console.log('wrong email');
    }
  };

  const validateUsername = () => {
    const emailRegex = /^[\w._-]+@(\w[\w_-]+)+\.[a-z]{2,3}$/i;
    return emailRegex.test(username);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="submit" value="Login" />
      </Form>
    </LoginContainer>
  );
}
