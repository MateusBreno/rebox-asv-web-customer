// ./src/pages/privates/Called/index.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import {
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
  ButtonDefault,
  InputText,
  ListCalled,
  ButtonMain,
} from '@components/index';
import { ConfigStorage, ConfigRules, ConfigRoutes } from '@config/index';
import User from '@models/User';
import { apiRebox, sessionStorageService } from '@services/index';
import { toastify } from '@utils/notifiers';

import { IResponseCalled } from './typing';

import {
  Container,
  ContainerGroup,
  Content,
  Options,
  OptionsGroup,
  ButtonLink,
  FormPage,
  Pagination,
  PaginationGroup,
  PaginationGroupText,
} from './styles';

const Called: React.FC = () => {
  const formPageRef = useRef<FormHandles>(null);

  const [user] = useState<User | null>(sessionStorageService.getUser());
  const [called, setCalled] = useState<IResponseCalled>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(
    Number.parseInt(
      sessionStorage.getItem(ConfigStorage.REBOX_PAGINATION_CALLED_LIST_PAGE) ||
        '1',
      10,
    ),
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCalled = useCallback(
    async (desiredPage = 1) => {
      try {
        setLoading(prevState => !prevState);
        if (!user)
          throw new Error('Oops! Não foi possível buscar suas assistências.');

        let url = `/called?page=${desiredPage}`;
        url += `&per_page=${ConfigRules.rebox.pagination.called.itemLimit}`;
        url += `&users_id=${user?.id}`;
        const { data: response } = await apiRebox.get(url);
        setCalled(response);
        const { total, per_page } = response.header;
        setTotalPages(Math.ceil(total / per_page));
        formPageRef.current?.setData({ currentPage: desiredPage });
      } catch (error: any) {
        if (error.message) toastify(error.message, 'error');
        console.error(
          'Houve um error ao buscar assistências do cliente.',
          error,
        );
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [user],
  );

  useEffect(() => {
    getCalled();
  }, [refresh]);

  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">
            Minhas assistências
          </SubtitleSecondary>

          <Options>
            <OptionsGroup>
              <ButtonLink to={ConfigRoutes.rebox.privates.called.next.new.path}>
                <ButtonMain>Abrir uma nova</ButtonMain>
              </ButtonLink>
            </OptionsGroup>
          </Options>

          <ListCalled
            calleds={called?.data}
            loading={loading}
            showTotal={true}
            totalValue={called?.header.total}
          />
          <Pagination>
            <ButtonDefault
              style={{
                borderRadius: '8px 0 0 8px',
                maxWidth: 100,
              }}
              disabled={page === 1}
              isDisable={page === 1}
              onClick={() => setPage(1)}
            >
              Primeira
            </ButtonDefault>
            <ButtonDefault
              iconLeft={IoChevronBack}
              style={{
                borderRadius: '0',
                maxWidth: 30,
                padding: '0 5px',
                margin: '0 5px',
              }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            <PaginationGroup>
              <FormPage
                ref={formPageRef}
                onSubmit={() => console.log('')}
                initialData={{ currentPage: page }}
              >
                <InputText
                  name="currentPage"
                  type="number"
                  min="1"
                  onChange={event => {
                    if (!(event.target.value === '')) {
                      setPage(Number.parseInt(event.target.value, 10));
                    }
                  }}
                />
              </FormPage>
              <PaginationGroupText>de {totalPages}</PaginationGroupText>
            </PaginationGroup>

            <ButtonDefault
              iconLeft={IoChevronForward}
              style={{
                borderRadius: '0',
                maxWidth: 30,
                padding: '0 5px',
                margin: '0 5px',
              }}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
            <ButtonDefault
              style={{
                borderRadius: '0 8px 8px 0',
                maxWidth: 100,
              }}
              disabled={page === totalPages}
              isDisable={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              Última
            </ButtonDefault>
          </Pagination>
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default Called;
