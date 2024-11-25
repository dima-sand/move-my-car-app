import { Paper, SxProps } from '@mui/material';
import { Grid2 as Grid, Grid2Props } from "@mui/material";

interface IGridSectionProps {
  paperSxProp?: SxProps;
}

const GridSection = (props: Grid2Props & IGridSectionProps) => {
  const { paperSxProp, ...gridProps } = props;
  return (
    <Grid {...gridProps} >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          borderRadius: 3,
          height: '100%',
          width: '100%',
          backgroundColor: 'darkgray',
          ...paperSxProp
        }}>
        {props.children}
      </Paper>
    </Grid>
  );
}


export default GridSection;