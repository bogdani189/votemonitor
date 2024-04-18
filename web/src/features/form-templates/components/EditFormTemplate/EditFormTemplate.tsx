import { useLoaderData, useNavigate } from '@tanstack/react-router';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '@/common/auth-api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { FormTemplateFull, FormTemplateType } from '../../models/formTemplate';
import { Route as FormTemplatesListRoute } from '@/routes/form-templates/'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '@/containers/LanguageSelect';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon } from '@heroicons/react/24/solid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import EditFormTemplateFooter from './EditFormTemplateFooter';


export default function EditFormTemplate() {
  const navigate = useNavigate({ from: FormTemplatesListRoute.fullPath })
  const { t } = useTranslation();
  const formTemplate: FormTemplateFull = useLoaderData({ strict: false });
  const { toast } = useToast();

  const editFormTemplateFormSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    defaultLanguage: z.string(),
    formTemplateType: z.enum([FormTemplateType.Opening, FormTemplateType.Voting, FormTemplateType.ClosingAndCounting]).catch(FormTemplateType.Opening)
  });

  const form = useForm<z.infer<typeof editFormTemplateFormSchema>>({
    resolver: zodResolver(editFormTemplateFormSchema),
    defaultValues: {
      code: formTemplate.code,
      name: formTemplate.name[formTemplate.defaultLanguage],
      description: formTemplate.description[formTemplate.defaultLanguage],
      formTemplateType: formTemplate.formTemplateType,
      defaultLanguage: formTemplate.defaultLanguage,
    },
  });

  function onSubmit(values: z.infer<typeof editFormTemplateFormSchema>) {
    const updatedFormTemplate: FormTemplateFull = {
      ...formTemplate
    };

    editMutation.mutate(updatedFormTemplate);
  }

  const deleteMutation = useMutation({
    mutationFn: (formTemplateId: string) => {
      return authApi.delete<void>(`/form-templates/${formTemplateId}`);
    },
    onSuccess: () => {
      navigate({ search: (prev) => (prev) });
    },
  });

  const editMutation = useMutation({
    mutationFn: (obj: FormTemplateFull) => {

      return authApi.post<void>(
        `/form-templates/${formTemplate.id}`,
        obj
      );
    },

    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Observer successfully updated',
      });
    },
  });

  const { setValue } = form;

  return (
    <Layout title={`${formTemplate.code} - ${formTemplate.name[formTemplate.defaultLanguage]}`}>
      <Tabs defaultValue='form-details'>
        <TabsList className='grid grid-cols-2 bg-gray-200 w-[400px] mb-4'>
          <TabsTrigger value='form-details'>Template form details</TabsTrigger>
          <TabsTrigger value='questions'>Questions</TabsTrigger>
        </TabsList>
        <TabsContent value='form-details'>
          <Card className='pt-0'>
            <CardHeader className='flex flex-column gap-2'>
              <div className='flex flex-row justify-between items-center'>
                <CardTitle className='text-xl'>Template form details</CardTitle>

              </div>
              <Separator />
            </CardHeader>
            <CardContent className='flex flex-col gap-6 items-baseline'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Fieldset className='grid grid-cols-2 gap-12'>
                    <FieldGroup className='!mt-0'>
                      <FormField
                        control={form.control}
                        name='code'
                        render={({ field }) => (
                          <Field>
                            <Label>{t('form-template.field.code')}</Label>
                            <Input placeholder={t('form-template.placeholder.code')} {...field} />
                          </Field>)} />

                      <FormField
                        control={form.control}
                        name="formTemplateType"
                        render={({ field }) => (
                          <Field>
                            <Label>{t('form-template.field.formTemplateType')}</Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </Field>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <Field>
                            <Label>{t('form-template.field.name')}</Label>
                            <Input placeholder={t('form-template.placeholder.name')} {...field} />
                          </Field>)} />

                      <FormField
                        control={form.control}
                        name='defaultLanguage'
                        render={({ field }) => (
                          <Field>
                            <Label>{t('form-template.field.defaultLanguage')}</Label>
                            <LanguageSelect
                              languageCode={field.value}
                              onSelect={field.onChange}
                            />
                          </Field>
                        )}
                      />
                    </FieldGroup>
                    <FieldGroup className='!mt-0'>
                      <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                          <Field>
                            <Label>{t('form-template.field.description')}</Label>
                            <Textarea rows={10} cols={100} {...field} placeholder={t('form-template.placeholder.description')} />
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </Fieldset>
                </form>
              </Form>
            </CardContent>
            <CardFooter className='flex justify-between'></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='questions'>
          <Card className='pt-0'>
            <CardHeader className='flex flex-column gap-2'>
              <div className='flex flex-row justify-between items-center'>
                <CardTitle className='text-xl'>Template form questions</CardTitle>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className='-mx-6 flex items-start justify-left px-6 sm:mx-0 sm:px-8'>
              editorr goes here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <EditFormTemplateFooter/>
    </Layout>
  );
}