import React from 'react';

const Form = ({ children, id }) =>
<div>
    <section>
      <form className='form' id={ id }>
        { children }
      </form>
    </section>
</div>;

export default Form;
