import { css } from 'lit';

export const styles = css`
  main {
    max-width: 1440px;
    margin: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    margin: auto;
    gap: 2.5rem;

    @media (max-width: 768px) {
      align-items: center;
      flex-direction: column;
    }
  }
`;
