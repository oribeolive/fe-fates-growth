import Image from 'next/image'
import Link from 'next/link';
import Contents from './Contents';
import { readFileSync } from 'fs';
import path from 'path';

const fetchApiData = async () => {
  const apiUrl = process.env.API_URL + '/api';
  const unitData = await fetch(`${apiUrl}/unit_base_stats/`/*, { cache: 'no-store' }*/).then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
  });
  const classes = await fetch(`${apiUrl}/classes/`).then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
  });
  const strengths = await fetch(`${apiUrl}/strengths/`).then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
  });
  const weaknesses = await fetch(`${apiUrl}/weaknesses/`).then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
  });
  const parents = await fetch(`${apiUrl}/parents/`).then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
  });
  return {
    unitData: unitData,
    classes: classes,
    strengths: strengths,
    weaknesses: weaknesses,
    parents: parents,
  }
};

const fetchJsonData = () => {
  const readJson = (fileName: string) => {
    const jsonPath = path.join(process.cwd(),  'files', `${fileName}.json`);
    const jsonText = readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(jsonText);
    return data;
  };
  const unitData = readJson('unit_base_stats');
  const classes = readJson('classes');
  const strengths = readJson('strengths');
  const weaknesses = readJson('weaknesses');
  const parents = readJson('parents');
  return {
    unitData: unitData,
    classes: classes,
    strengths: strengths,
    weaknesses: weaknesses,
    parents: parents,
  }
};

export default async function Home() {

  const { unitData, classes, strengths, weaknesses, parents } = process.env.DATA_SOURCE == 'api' ? await fetchApiData() : fetchJsonData();

  return (
    <>
    <main className="flex flex-col justify-between px-6">
      <h1 className='text-xl font-bold text-red-800 dark:text-violet-200'><Link href=".">ファイアーエムブレムif ステータス期待値</Link></h1>
      <Contents units={unitData} classes={classes} strengths={strengths} weaknesses={weaknesses} parents={parents} />
    </main>
    </>
  )
}
