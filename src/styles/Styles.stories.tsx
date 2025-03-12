import type { Meta, StoryObj } from '@storybook/react';
import { StyleWrapper } from './helpers/stories/StyleWrapper';

const meta: Meta = {
  title: 'Design System/Styles/Default Styles',
  tags: ['autodocs'],
};

interface Args {
  text: string;
}

export default meta;
type Story = StoryObj<Args>;

export const H1: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h1>{text}</h1>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const H2: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h2>{text}</h2>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const H3: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h3>{text}</h3>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const H4: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h4>{text}</h4>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const H5: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h5>{text}</h5>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const H6: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <h6>{text}</h6>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const Strong: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <strong>{text}</strong>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const Em: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <em>{text}</em>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const Span: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <span>{text}</span>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const P: Story = {
  render: () => (
    <StyleWrapper>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio alias
        laborum, obcaecati ea corporis quasi reprehenderit esse harum?
        Asperiores exercitationem minus at magni nostrum soluta ut maxime eos
        unde repellendus eveniet sint corporis, nisi minima quidem dolor quos et
        consequatur porro, nesciunt autem quia facere amet tenetur! Corrupti
        earum inventore quaerat dolorum itaque error architecto. Aliquam officia
        culpa incidunt. Cupiditate nobis repellendus pariatur corrupti sunt
        porro labore explicabo necessitatibus veritatis! Ad magnam suscipit
        aliquid ipsa fugiat, veniam unde incidunt. Atque alias dolor voluptate
        ea hic, architecto at fuga explicabo, id laudantium totam, recusandae
        error officia deleniti odit minima nisi officiis!
      </p>
      <p>
        Magni minima blanditiis eius tenetur sit vel fuga quas corrupti deserunt
        animi iure, fugiat facere ipsa? Quibusdam dolorem, ea, nemo expedita
        repellat ducimus, illum quasi commodi et aliquam id distinctio quod
        quidem. Cupiditate maiores rem laudantium similique dicta! Doloremque,
        aperiam beatae voluptatibus nam vitae, ullam molestias reiciendis
        quibusdam, repellendus sed temporibus repudiandae enim facere hic qui
        sit quam explicabo error similique quis rerum recusandae? Veniam, et
        suscipit? Consequuntur non praesentium laudantium maxime quia vitae
        consequatur sed, temporibus corporis cum hic tenetur culpa ea recusandae
        ratione dolorem debitis libero reiciendis. Recusandae eum velit
        doloribus odit iste in quidem, modi deserunt est!
      </p>
      <p>
        Animi quos minima inventore magni sit consectetur ipsam nemo voluptate
        quasi. Eveniet maiores unde eaque repellendus aut ipsa vero sunt
        praesentium. Dolor vitae in laborum doloribus, eius beatae corrupti,
        sint ipsum alias quae quo deleniti dignissimos excepturi corporis
        inventore provident ex repudiandae et! Earum ab laborum delectus
        dolores, repellendus nostrum voluptatum ut porro. Reiciendis deserunt
        iste recusandae facilis ut nemo quisquam debitis qui assumenda porro.
        Consequatur natus magnam deleniti doloremque qui, laboriosam ea incidunt
        neque eveniet enim et necessitatibus tempora explicabo veritatis velit
        perspiciatis praesentium non ipsa numquam aperiam nisi consequuntur,
        dolorem quidem? Veniam dignissimos ad autem eaque, doloremque cum!
      </p>
    </StyleWrapper>
  ),
};

export const A: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href='#'>{text}</a>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const Ul = {
  render: () => (
    <StyleWrapper>
      <ul>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam animi
          enim fugiat, quam alias, ipsa ratione repudiandae explicabo adipisci
          quasi sint laborum sit tenetur veritatis eius similique recusandae
          nemo excepturi.
        </li>
        <li>
          In velit, ducimus aliquam aliquid dolorum commodi soluta assumenda
          eius cumque consequatur molestias, omnis quibusdam quae blanditiis.
          Illum sunt nostrum ut doloribus veritatis quas? Amet, sapiente?
          Quisquam deserunt incidunt illo?
        </li>
        <li>
          Eos, vero mollitia molestiae voluptates laudantium asperiores quo hic,
          ab, ipsum laborum explicabo culpa consectetur quod tempora. Excepturi
          esse tempore at numquam eligendi consectetur repellendus, sint
          distinctio blanditiis cum sequi.
        </li>
        <li>
          Earum voluptates sint amet magni cum officia error, consequuntur vel
          quo fugiat esse non exercitationem ducimus odio unde repudiandae
          iusto, laborum consectetur itaque voluptas. Laudantium architecto quas
          sapiente ut quibusdam.
        </li>
        <li>
          Officiis, tempora. Tempora reprehenderit aliquam provident
          consequuntur, assumenda voluptatum, quia officia repellat sunt libero
          placeat ipsam atque dignissimos consectetur recusandae, dolor
          repellendus vel ut! Officiis quasi commodi placeat dicta quia!
        </li>
      </ul>
    </StyleWrapper>
  ),
};

export const Ol: Story = {
  render: () => (
    <StyleWrapper>
      <ol>
        <li>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          laboriosam accusantium exercitationem, cumque iusto unde temporibus
          repellat ab animi quam harum neque reiciendis reprehenderit at facere?
          Eveniet hic dignissimos maiores.
        </li>
        <li>
          Unde, sapiente nulla at nesciunt soluta nisi atque distinctio odit et
          quae omnis voluptatibus amet asperiores optio repudiandae dolor? Magni
          ut eaque, consequatur minus quam quia! Beatae facere similique
          quibusdam!
        </li>
        <li>
          Omnis porro, exercitationem in minus quam eveniet perspiciatis ipsum
          doloremque vitae numquam sit ut quis quae? Reiciendis sed cum sunt
          exercitationem et cupiditate. Quae nisi harum quaerat debitis
          repellendus illum.
        </li>
        <li>
          Enim, esse! Numquam, aspernatur. Fuga, quibusdam repellendus deserunt
          amet inventore reiciendis ipsa quo autem possimus aut in pariatur
          ullam voluptas ex ab vel repellat dicta magni necessitatibus,
          exercitationem omnis quis.
        </li>
        <li>
          Molestiae neque ex autem libero iure laudantium quam quisquam, ducimus
          culpa obcaecati numquam rem assumenda doloribus. Esse cum quae sequi
          omnis alias quibusdam voluptatibus dicta. Saepe adipisci alias
          voluptatem cupiditate.
        </li>
      </ol>
    </StyleWrapper>
  ),
};

export const Pre: Story = {
  render: ({ text }) => (
    <StyleWrapper>
      <pre>{text}</pre>
    </StyleWrapper>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const Table: Story = {
  render: () => (
    <StyleWrapper>
      <table>
        <caption>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Voluptatibus, distinctio.
        </caption>
        <thead>
          <tr>
            <th>Lorem.</th>
            <th>Excepturi?</th>
            <th>Ex.</th>
            <th>Cumque.</th>
            <th>Tempora.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lorem.</td>
            <td>Sint.</td>
            <td>Accusantium.</td>
            <td>Similique?</td>
            <td>Dolor?</td>
          </tr>
          <tr>
            <td>Lorem.</td>
            <td>Repudiandae.</td>
            <td>Debitis.</td>
            <td>Iure.</td>
            <td>Error.</td>
          </tr>
          <tr>
            <td>Lorem.</td>
            <td>Corporis.</td>
            <td>Eius.</td>
            <td>Sequi?</td>
            <td>Blanditiis.</td>
          </tr>
          <tr>
            <td>Lorem.</td>
            <td>Minus!</td>
            <td>Autem?</td>
            <td>Aut?</td>
            <td>Tempora!</td>
          </tr>
          <tr>
            <td>Lorem.</td>
            <td>Odio?</td>
            <td>Deserunt.</td>
            <td>Repellat?</td>
            <td>Recusandae?</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Lorem.</td>
            <td>Tenetur!</td>
            <td>Ab!</td>
            <td>Numquam!</td>
            <td>At?</td>
          </tr>
        </tfoot>
      </table>
    </StyleWrapper>
  ),
};
