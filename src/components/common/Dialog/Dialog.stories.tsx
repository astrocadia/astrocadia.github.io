import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Button } from '../buttons';
import { Dialog } from './Dialog';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';

const meta: Meta<typeof Dialog> = {
  title: 'Design System/Components/Dialog',
  tags: ['autodocs'],
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle
              title='Lorem ipsum dolor sit'
              subTitle='Lorem ipsum, dolor sit amet consectetur adipisicing'
              onClose={onClose}
            />
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
            <DialogActions>
              <Button
                variant='primary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Discard clicked')}
              >
                Discard
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoCloseAction: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open}>
            <DialogTitle
              title='Lorem ipsum dolor sit'
              subTitle='Lorem ipsum, dolor sit amet consectetur adipisicing'
            />
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
            <DialogActions>
              <Button variant='primary' onClick={onClose}>
                Close Dialog
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoSubtitle: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle title='Lorem ipsum dolor sit' onClose={onClose} />
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
            <DialogActions>
              <Button
                variant='primary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Discard clicked')}
              >
                Discard
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoTitlesButClose: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle onClose={onClose} />
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
            <DialogActions>
              <Button
                variant='primary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Discard clicked')}
              >
                Discard
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoTitles: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open}>
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
            <DialogActions>
              <Button variant='primary' onClick={onClose}>
                Close Dialog
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoContent: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle
              title='Lorem ipsum dolor sit'
              subTitle='Lorem ipsum, dolor sit amet consectetur adipisicing'
              onClose={onClose}
            />
            <DialogActions>
              <Button
                variant='primary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Discard clicked')}
              >
                Discard
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const NoActions: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle
              title='Lorem ipsum dolor sit'
              subTitle='Lorem ipsum, dolor sit amet consectetur adipisicing'
              onClose={onClose}
            />
            <DialogContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing. Lorem ipsum
              dolor sit. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Distinctio, dignissimos? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Vero, esse? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, explicabo.
            </DialogContent>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};

export const ExtremeContent: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ThemeProviderWrapper>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle
              title='Lorem ipsum dolor sit'
              subTitle='Lorem ipsum, dolor sit amet consectetur adipisicing'
              onClose={onClose}
            />
            <DialogContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              neque sint pariatur maxime molestiae sunt corrupti porro quibusdam
              quod, voluptates est cupiditate commodi perferendis nostrum minus
              dolorum esse deserunt omnis quaerat modi ipsa repellat tempore!
              Illo nobis maiores nihil pariatur, incidunt tenetur dicta
              voluptatibus eius nostrum quia explicabo. Eos doloremque fuga sunt
              laudantium cupiditate aspernatur dolorem rem earum ab, inventore,
              aut repellendus maxime libero suscipit ex iusto. Libero quia
              aliquid doloremque vel laudantium fugit quas unde voluptas
              molestiae omnis quod exercitationem, ipsam sint consequatur esse
              quis, ipsum repellendus officiis saepe dolorem praesentium, ad
              dolorum rem! Consectetur, pariatur assumenda accusantium velit
              sequi voluptate optio molestiae omnis fugiat, consequuntur,
              aspernatur voluptatibus illo tempora ex vel iste facilis et
              dolorem. Earum natus ut iure maxime accusamus doloribus quia,
              aliquid neque adipisci, ad dolore, nobis laborum ullam. Delectus
              vitae accusantium, veniam quisquam doloremque ullam inventore
              numquam. Facere unde voluptatibus culpa incidunt voluptatem porro
              et animi, minus qui distinctio quas quisquam? Doloremque impedit
              numquam vitae, saepe maiores reiciendis pariatur eveniet non quod
              qui eos aperiam vero, nesciunt a, quisquam quos fugit provident
              incidunt ratione maxime soluta fugiat nisi. Doloremque fugit
              recusandae voluptates numquam optio nam inventore est obcaecati
              ratione corporis ut repellendus similique asperiores ex, omnis
              officia magni nulla iste aspernatur incidunt beatae? Amet
              voluptate voluptatum reiciendis? Dolorem magnam sapiente illum,
              iure dolor ut, aut facilis maiores deserunt, nihil vero quibusdam
              suscipit dignissimos tempora possimus molestiae eum non reiciendis
              exercitationem explicabo inventore! Quod consectetur cupiditate
              exercitationem perferendis error debitis, similique alias beatae
              sequi explicabo ex dolorum, dolorem corrupti amet ad nulla
              voluptas doloribus veritatis corporis magni dolores ipsa!
              Molestias quidem inventore, obcaecati vel officiis provident
              laboriosam, dolor, maxime doloremque aperiam corporis cumque. Quia
              ut provident aliquid officia nisi voluptatibus minus esse odit
              vero labore voluptatum magni explicabo, placeat, nemo alias
              recusandae ipsa modi! Voluptate nisi quo nemo numquam quas. Ipsa
              explicabo deleniti assumenda error quidem nulla esse quasi,
              nesciunt omnis amet voluptatum labore fugiat tempora quis. Magnam
              voluptatibus dicta totam a veritatis ab hic libero, at quae alias
              sed cupiditate illo provident quidem maxime illum dolores cum eos
              nesciunt. Voluptates earum iure incidunt cupiditate fugit. Commodi
              quasi harum facilis enim blanditiis itaque, qui saepe impedit
              repellendus temporibus aut vitae quo nemo veritatis omnis quae,
              nulla deleniti sunt excepturi error nesciunt exercitationem
              recusandae mollitia! Esse enim, quo harum omnis aspernatur
              laboriosam aut, assumenda atque fugiat, officia qui deserunt quod!
              Maiores deserunt eveniet cupiditate incidunt odio voluptatibus,
              consequuntur vitae culpa dolores. Aspernatur ab sed expedita optio
              numquam blanditiis quod magni nemo fuga, incidunt excepturi. Odit
              praesentium sapiente beatae excepturi sit maiores recusandae
              nostrum? Quas nulla a dolores? Inventore illo dicta velit corrupti
              atque quis, deleniti, distinctio tenetur nisi aliquid dolores
              nihil cumque pariatur ut doloribus explicabo quos provident dolor
              officiis. Velit nihil error culpa id iure nam est animi fugiat
              aliquam non, cupiditate laborum beatae praesentium, facilis
              quibusdam laboriosam adipisci maiores dolorum quos, accusantium
              consequuntur perferendis aspernatur? Distinctio similique minima
              illum adipisci odit hic error nisi quod aperiam vitae? Quas, modi
              id! Natus reiciendis, neque aperiam voluptatibus atque dolores
              similique voluptate quisquam. Qui saepe dolorem amet maiores
              ducimus quod tempore natus dolore quidem obcaecati. Rem nulla, ab
              quibusdam sunt asperiores dolores dignissimos culpa saepe
              perferendis, commodi nihil repellat itaque nostrum optio. Alias
              inventore, in at dignissimos voluptatum provident qui, ipsum
              exercitationem facere nisi sed veniam architecto ipsam nobis,
              fugiat aliquam ratione repellat saepe. Quam error praesentium
              itaque dolore ratione odio ut suscipit sed exercitationem dicta
              alias quae recusandae numquam cum sequi nemo nostrum in iusto illo
              aperiam, hic necessitatibus! Itaque velit perspiciatis qui sint
              aliquam nostrum nam repellat magnam! Minus eius tenetur veritatis
              libero ipsa? Sunt repellendus doloremque, nihil labore nesciunt
              velit odio officia? Iure eaque eveniet fuga sed praesentium
              ducimus debitis vel asperiores quo, amet deleniti. At similique
              dolor expedita deserunt temporibus alias consequuntur soluta,
              officia ad doloremque, accusantium quaerat sit nemo voluptate ipsa
              culpa et odit corporis deleniti quia ratione a aperiam beatae.
              Deleniti vitae, reiciendis totam sunt beatae magni aliquam
              laudantium repudiandae aperiam quidem corrupti placeat voluptate
              quas, porro rerum assumenda aliquid voluptatem ad. Rem minus
              ratione labore aperiam, voluptatem ipsum est sint itaque et, ut
              consectetur dolores, facilis minima tenetur eveniet suscipit?
              Labore maiores accusamus cum nesciunt sed fugiat quod odio,
              reprehenderit facere. Quis earum ipsa autem doloremque saepe iste
              atque eos exercitationem laudantium quas? Blanditiis hic aut
              incidunt? Est vitae odit officia non sit harum voluptates aut
              corporis voluptatum mollitia necessitatibus magni, quaerat magnam
              laboriosam dolores omnis esse labore vero illo blanditiis qui! Ex,
              rerum accusantium? Nobis aspernatur repellendus culpa distinctio
              optio recusandae similique, ut cupiditate voluptates porro dicta
              tenetur at eligendi laboriosam eius explicabo rem a quae
              provident! Sint ullam dicta officia est quia optio? Nobis, magni
              fuga quibusdam repudiandae vitae obcaecati ex maxime quas. Porro
              maxime autem suscipit culpa dolorum repudiandae perspiciatis error
              ipsam blanditiis fuga ipsum aliquid, iure ducimus animi excepturi
              sequi voluptas, odio molestias magnam vero nulla. Expedita
              corrupti architecto vitae consectetur dicta earum iusto cum dolore
              quisquam soluta dolores ducimus, odio ea eaque neque culpa nam,
              sequi doloribus debitis quia libero itaque esse quas. Optio,
              blanditiis. Voluptatem mollitia minus perferendis modi repellat.
              Quia, cupiditate. Autem deleniti inventore asperiores nostrum qui
              amet quae expedita labore consectetur hic unde esse at similique
              magni, debitis officiis. Autem suscipit perspiciatis praesentium
              eum numquam quos non doloribus, vitae ab eius quo, voluptatum rem.
              Ex cupiditate impedit eaque facilis. Quasi neque iste, quam ipsa
              iure asperiores earum laborum provident delectus quidem tenetur
              temporibus officiis laudantium, cum illo, excepturi enim nulla
              esse commodi magnam rem. Eaque quis suscipit at quibusdam culpa,
              tempora laborum optio veritatis voluptates nisi odit aspernatur
              illo recusandae vitae perspiciatis placeat labore quas a
              voluptatibus ut cupiditate harum ad sint expedita. Placeat amet
              soluta eaque assumenda repellat cum quisquam quibusdam maiores vel
              incidunt autem voluptates molestias, accusamus aut quis sed facere
              fugit sit consequatur fugiat architecto nobis facilis. Dicta
              dolorum sapiente amet eaque assumenda molestiae est, cupiditate
              laboriosam expedita totam. Possimus rerum natus quia quam eos
              minus odit id, iste tempora itaque, quos atque reprehenderit, ad
              sint fugit mollitia? Recusandae, et!
            </DialogContent>
            <DialogActions>
              <Button
                variant='primary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Discard clicked')}
              >
                Discard
              </Button>
              <Button
                variant='secondary'
                // eslint-disable-next-line no-console
                onClick={() => console.log('Save Preferences clicked')}
              >
                Save Preferences
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProviderWrapper>
      </>
    );
  },
};
