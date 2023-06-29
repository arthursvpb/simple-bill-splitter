import { css } from 'lit';

export const styles = css`
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .payers-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .card-basic {
    position: relative;
    margin-top: 20px;
    width: 265px;
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar-group {
    display: flex;
    gap: 20px;
  }

  .trash-icon {
    margin: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .needs-to-pay {
    color: var(--sl-color-green-700);
    font-weight: bold;
  }
`;
