import React, { Suspense, useState } from "react"
import { Form, FormProps } from "src/app/components/Form"
import { LabeledTextField } from "src/app/components/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/app/components/Form"

export function UserimageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField name="url" label="Url" placeholder="Url" type="text" />
      <LabeledTextField name="usimage" label="Upload Image" type="file" />

      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}

/*

*/

/*
<LabeledSelectField
  name="id"
  label="User Id"
  placeholder="User Id"
  options={users}
/>
*/
