//there are 2 ways of writing the 'save' property for dynamic brocks:
//1. you write the content to be returned on the frontend in the 'save' property, then when you want to change this content, write an object in the 'deprecated' property with the old 'save' and 'attributes' properties; then you have to go to the CMS and update each post that uses this block. the code for this way of doing (which is the "official" way) is commented out below.
//2. another way of doing that is to simply return null in the 'save' property, then handling the returned value in the php file; this way you don't have to write 'deprecated' properties and also don't have to update each post in the CMS.

// 1.

import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from '@wordpress/components';
import './index.scss';

//disable Update button in the CMS if there is any are-you-paying-attention block with the correctAnswer attribute set to undefined
(() => {
  let locked = false;

  wp.data.subscribe(function () {
    const results = wp.data
      .select('core/block-editor')
      .getBlocks()
      .filter(
        (block) =>
          block.name == 'ourplugin/are-you-paying-attention' &&
          block.attributes.correctAnswer == undefined
      );

    if (results.length && locked == false) {
      locked = true;
      wp.data.dispatch('core/editor').lockPostSaving('noanswer');
    }
    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch('core/editor').unlockPostSaving('noanswer');
    }
  });
})();

wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    question: { type: 'string' },
    answers: { type: 'array', default: [''] },
    correctAnswer: { type: 'number', default: undefined },
  },
  edit: EditComponent, //what the admin sees in the admin's CMS
  save: function (props) {
    return null;
  }, //what the actual public will see in the content
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(
      (x, index) => index != indexToDelete
    );
    props.setAttributes({ answers: newAnswers });

    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  return (
    <div className='paying-attention-edit-block'>
      <TextControl
        label='Question:'
        value={props.attributes.question}
        onChange={updateQuestion}
        style={{ fontSize: '20px' }}
      />
      <p style={{ fontSize: '13px', margin: '20px 0 8px 0' }}>Answers:</p>
      {props.attributes.answers.map((answer, index) => (
        <Flex>
          <FlexBlock>
            <TextControl
              value={answer}
              onChange={(newValue) => {
                const newAnswers = props.attributes.answers.concat([]);
                newAnswers[index] = newValue;
                props.setAttributes({ answers: newAnswers });
              }}
              autoFocus={answer == undefined}
            />
          </FlexBlock>
          <FlexItem>
            <Button>
              <Icon
                onClick={() => markAsCorrect(index)}
                className='mark-as-correct'
                icon={
                  props.attributes.correctAnswer == index
                    ? 'star-filled'
                    : 'star-empty'
                }
              />
            </Button>
          </FlexItem>
          <FlexItem>
            <Button
              isLink
              onClick={() => deleteAnswer(index)}
              className='attention-delete'
            >
              Delete
            </Button>
          </FlexItem>
        </Flex>
      ))}
      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat(undefined),
          });
        }}
      >
        Add Another Answer
      </Button>
    </div>
  );
}

// 2.
// wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
//   title: 'Are You Paying Attention?',
//   icon: 'smiley',
//   category: 'common',
//   attributes: {
//     skyColor: { type: 'string' },
//     grassColor: { type: 'string' },
//   },
//   edit: function (props) {
//     function updateSkyColor(event) {
//       props.setAttributes({ skyColor: event.target.value });
//     }
//     function updateGrassColor(event) {
//       props.setAttributes({ grassColor: event.target.value });
//     }

//     return (
//       <div className=''>
//         <input
//           type='text'
//           placeholder='sky color'
//           onChange={updateSkyColor}
//           value={props.attributes.skyColor}
//         />
//         <input
//           type='text'
//           placeholder='grass color'
//           onChange={updateGrassColor}
//           value={props.attributes.grassColor}
//         />
//       </div>
//     );
//   }, //what the admin sees in the admin's CMS
//   save: function (props) {
//     return (
//       <>
//         <h6>
//           Today the sky is absolutely{' '}
//           <span className='skyColor'>{props.attributes.skyColor}</span> and the
//           grass is{' '}
//           <span className='grassColor'>{props.attributes.grassColor}</span>.
//         </h6>
//       </>
//     );
//   }, //what the actual public will see in the content
//   deprecated: [
//     //this array receives 'attributes' and 'save' properties of the original block, so that we can change the 'save' property without causing errors
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <h1>
//               Today the sky is absolutely{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </h1>
//           </>
//         );
//       },
//     },
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <h4>
//               Today the sky is completely{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </h4>
//           </>
//         );
//       },
//     },
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <p>
//               Today the sky is{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </p>
//           </>
//         );
//       },
//     },
//   ],
// });
