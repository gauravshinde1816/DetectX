import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import {Button} from '@material-ui/core'

import FileUpload from './Fileupload/FileUpload';
import '../../src/Pages/Home/Home.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [results, setResults] = useState([]);


  const onChange = e => {
      setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log("MOdal working")
      const formData = new FormData(e.target);
      
      const Upload = async () => {
        await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        }).then(resp => {
          resp.json().then(data => {
              const { fileName, filePath, ls } = data;
              setUploadedFile({ fileName, filePath});
              setResults(ls);
              console.log('res:\t'+results);
              console.log(data);
          })
        })
      }
      Upload();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="center">Test</TableCell>
                <TableCell align="left">Result</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                  props.result.map((a) => 
                      <TableRow key={a.key} > 
                          <TableCell align="center"  scope="row">{a.name}</TableCell>
                          <TableCell align="left">{a.result}</TableCell>
                      </TableRow>
                      )
                }
            </TableBody>
            </Table>
        </TableContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
