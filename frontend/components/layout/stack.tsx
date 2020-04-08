import { ReactNode } from 'react';
import styled from '@emotion/styled';

type StackProps = {
    children: ReactNode;
};

const StackWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:first-of-type) {
        margin-top: 2em;
    }
`;

const Stack = ({ children }: StackProps) => (
    <StackWrapper>{children}</StackWrapper>
);

export default Stack;
