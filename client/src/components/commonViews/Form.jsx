import React from 'react';

const Form = ({ children, id, onSubmit, formClass }) =>
<div>
    <section>
      <form
        className={`form ${formClass}`}
        id={ id }
        onSubmit={ onSubmit }
      >
        { children }
      </form>
    </section>
</div>;

export default Form;
