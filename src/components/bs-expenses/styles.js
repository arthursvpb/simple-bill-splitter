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
    width: 250px;
  }

  .card-content {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .card-input {
    width: 180px;
  }

  .trash-icon {
    margin: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .hide {
    visibility: hidden;
  }

  .display-none {
    display: none;
  }

  .select-payers {
    margin-top: 20px;
  }

  sl-select::part(tag__remove-button) {
    display: none;
  }
`;
